<div align="center">
<h1>🌱 Crop Assistant (Hackathon MVP)</h1>
<p><strong>Quick, farmer‑friendly crop disease diagnosis + actionable steps + weather + mandi (market) price.</strong></p>
</div>

## 1. Elevator Pitch
In under 10 seconds a farmer (or extension worker) can snap / upload a leaf photo and get: disease name, confidence, 1–2 safe recommended actions, local weather summary, and a nearby (mock) mandi price. Dual‑language ready (English/Hindi planned). Designed for a 3‑minute demo: fast, clear, ethical, honest about uncertainty.

## 2. Current Status (MVP Skeleton)
| Capability | Status | Notes |
|------------|--------|-------|
| React Frontend (upload + display) | ✅ Basic | Styling minimal; i18n scaffold pending |
| Flask API skeleton | ✅ | Returns placeholder / mock responses |
| Model file placeholder | ✅ | `model/crop_disease_model.pt` (demo stub) |
| Weather + Market routes | ✅ Basic mock | Real API key integration TODO |
| Actions mapping / postprocess | 🔜 | To be added in `utils/postprocess.py` |
| Training scripts / data prep | 🔜 | To be added (`data/prepare.py`, `models/train.py`) |
| Hindi localization | 🔜 | Add `frontend/src/i18n/en.json`, `hi.json` |
| Tests (API + inference) | 🔜 | Pytest scaffolding |

## 3. Architecture Overview
```
User -> React (file upload) -> /api/diagnose (Flask) -> Image preprocessing -> Model inference
                  |                                                             |
                  |----> /api/weather (mock / OpenWeather)                      |
                  |----> /api/market (mock mandi price)                         |
Response JSON -> UI cards + (future) TTS / language toggle
```

### Backend (Flask)
* Blueprints: `diagnose`, `weather`, `market` under `backend/routes/`
* Model Inference (placeholder) – will load a fine‑tuned EfficientNet / MobileNet for 5 crops x ~6 diseases each.
* Post‑processing: Map raw class -> {crop, disease, recommended_actions, severity_tier}

### Frontend (React)
* Components: `ImageUpload`, `DiagnosisResult`, `WeatherInfo`, `MarketPrices`
* Service utilities: API calls (`services/api.js`, `services/weather.js`)
* Planned: `i18n` directory with simple key/value JSON + context/provider.

## 4. File / Folder Structure (Current)
```
backend/
   app.py                 # Registers blueprints & runs server
   routes/
      diagnose.py          # /api/diagnose (placeholder)
      weather.py           # /api/weather (mock)
      market.py            # /api/market (mock)
   utils/
      image_processing.py  # Preprocess stubs
      api_helpers.py       # Helper utilities
   model/
      crop_disease_model.pt (stub)
   requirements.txt
frontend/
   public/index.html
   src/
      App.js / App.css / index.js / index.css
      components/
         ImageUpload.js
         DiagnosisResult.js
         WeatherInfo.js
         MarketPrices.js
      services/
         api.js
         weather.js
README.md (this file)
```

## 5. Run the Project (Windows PowerShell)
### Prerequisites
* Node.js (LTS ≥ 18)
* Python ≥ 3.10 (with `py` launcher) + pip

### Start Backend (Port 5000)
```powershell
cd "C:\Users\Priya\Documents\Codeslayers\crop-assistant\backend"
py -m venv venv
./venv/Scripts/Activate.ps1
pip install -r requirements.txt
python app.py
```
You should see: `Running on http://127.0.0.1:5000/`.

### Start Frontend (Configured for Port 3001)
```powershell
cd "C:\Users\Priya\Documents\Codeslayers\crop-assistant\frontend"
npm install
$env:PORT=3001   # (Only if you want to override; script already sets PORT=3001)
npm start
```
Open: http://127.0.0.1:3001

### Quick Health Checks
```powershell
curl http://127.0.0.1:5000/
# Expected: Welcome message
```

## 6. Planned API Specification (Target JSON)
`POST /api/diagnose`
Response (example):
```json
{
   "crop": "tomato",
   "disease": "early_blight",
   "confidence": 0.87,
   "recommended_actions": ["Remove affected leaves","Use approved low-toxicity fungicide if spreading"],
   "weather": {"temp_c": 28.5, "rain_expected": false, "summary": "clear"},
   "market_price": {"crop": "tomato", "price_per_kg": 22.5, "mandi": "Pune APMC"},
   "language": "en",
   "notes": "Confidence < 0.9: verify in field"
}
```

Other endpoints:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Model + service readiness (planned) |
| GET | `/api/metadata` | Class list, version info (planned) |
| GET | `/api/weather?lat=..&lon=..` | Mock / real weather |
| GET | `/api/market?crop=tomato` | Mock mandi price |

### Example cURL (diagnose)
```bash
curl -X POST -F image=@leaf.jpg http://127.0.0.1:5000/api/diagnose
```

## 7. Model Roadmap
| Phase | Action |
|-------|--------|
| P0 | Use pretrained EfficientNet-B0 / MobileNetV3 small; freeze backbone; train final layer on subset (PlantVillage) |
| P1 | Add ONNX export + (optional) quantization |
| P2 | Active learning loop: store low-confidence samples (with consent) |

### Training Scripts (Planned)
| Script | Purpose |
|--------|---------|
| `data/prepare.py` | Split + augment (resize 224, flip, color jitter) |
| `models/train.py` | Fine-tune + save `models/best.pth` |
| `models/infer.py` | CLI top-k predictions |
| `export_onnx.py` | Convert to ONNX for edge/mobile |

## 8. Recommended Actions Mapping (Planned File)
`backend/utils/postprocess.py` + `recommended_actions.json` (sample):
```json
{
   "tomato_early_blight": {
      "actions": ["Remove infected leaves", "Improve airflow; avoid overhead watering"],
      "severity": "moderate"
   },
   "unknown": {"actions": ["Capture clearer photo", "Consult local extension officer"], "severity": "n/a"}
}
```

## 9. Localization Roadmap
Create:
```
frontend/src/i18n/en.json
frontend/src/i18n/hi.json
```
Example `en.json`:
```json
{ "upload_title": "Upload Leaf Photo", "diagnose_button": "Diagnose", "confidence_label": "Confidence", "weather_title": "Weather", "market_price_title": "Market Price", "unknown_label": "Not sure", "consult_expert": "Consult expert" }
```
Add a simple `useI18n` hook / context and language toggle button.

## 10. Ethics, Safety & Limitations
* NOT a medical / pesticide prescription tool – only general cultural practices + “consult expert” disclaimers.
* Dataset Bias: Initial dataset (PlantVillage) is largely lab / controlled backgrounds → field performance may degrade.
* Privacy: Images are not stored by default in MVP (add configurable retention later with consent).
* Uncertainty: Low confidence (< threshold) returns an “Unknown / Ask Expert” path.
* Accessibility: Plan to add Hindi + audio readout (TTS) for low‑literacy users.

## 11. Troubleshooting
| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| `npm start` ENOENT seeks package.json in parent | Ran in wrong folder | `cd frontend` first |
| Port 3000 unavailable | Another process / different script port | Use http://127.0.0.1:3001 (current setting) |
| `Module not found: Can't resolve './App.css'` | Missing file | Created `App.css` (already added) |
| `ModuleNotFoundError: No module named flask` | Wrong python (no venv) | Activate venv then install requirements |
| White page | Compile error in terminal | Fix error; hot reload will refresh |

## 12. Demo Script (30–60s)
1. Upload tomato leaf image.
2. Show diagnosis: “Early Blight – 87% confidence.”
3. Point to 2 actionable steps.
4. Show weather tile + mandi price.
5. (Future) Toggle to Hindi / play audio.
6. Conclude: “Fast, transparent support to reduce losses for smallholders.”

## 13. Roadmap / Next Steps
* Add full inference + model loader.
* Add proper evaluation: `evaluate.py` → `reports/eval.json`.
* Implement ONNX export + optional quantization.
* Dockerfile + simple `Makefile`.
* Add Jest tests for frontend & Pytest for backend.

## 14. Contributing
PRs welcome. Keep changes small, document new endpoints/flags, and avoid adding heavy dependencies without discussion.

## 15. License
MIT (add LICENSE file before public release).

---
Questions / stuck? Open an issue or reach out during the hackathon session. 🚀