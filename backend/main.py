from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
from typing import List

app = FastAPI()

# 💡 Must be full origin, no slashes, no trailing slash
origins = [
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ wildcard now allowed
    allow_credentials=False,  # ✅ must match
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("models/mlp_model.pkl")
scaler = joblib.load("models/scaler.pkl")
test_data = pd.read_csv("data/test_data.csv")

test_data_numeric = test_data.select_dtypes(include=["number"])
test_data_numeric["Scarcity"] = 0.65
test_data_numeric["Weight (lb)"] = 120
expected_features = joblib.load("models/feature_names.pkl")
test_data_numeric = test_data_numeric.reindex(columns=expected_features, fill_value=0)
X_test_scaled = scaler.transform(test_data_numeric)

class NameRequest(BaseModel):
    pokemon_name: str

class PriceRequest(BaseModel):
    target_price: float

@app.get("/pokemon-list")
def get_pokemon_list():
    return sorted(test_data["Name"].unique().tolist())

@app.post("/predict-price")
def predict_price(req: NameRequest):
    name = req.pokemon_name
    match = test_data[test_data["Name"].str.lower() == name.lower()]
    if match.empty:
        raise HTTPException(status_code=404, detail="Pokémon not found")

    features = match.select_dtypes(include=["number"])
    features["Scarcity"] = 0.65
    features["Weight (lb)"] = 120
    features = features.reindex(columns=expected_features, fill_value=0)

    scaled = scaler.transform(features)
    prediction = model.predict(scaled)[0]
    return {"predicted_price": round(prediction, 2)}

@app.post("/closest-match")
def closest_match(req: PriceRequest):
    predictions = model.predict(X_test_scaled)
    test_data["Predicted Price"] = predictions
    test_data["Price Diff"] = np.abs(predictions - req.target_price)
    closest = test_data.nsmallest(5, "Price Diff")

    return {
        "matches": [
            {"name": row["Name"], "predicted_price": round(row["Predicted Price"], 2)}
            for _, row in closest.iterrows()
        ]
    }
