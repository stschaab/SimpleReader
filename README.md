# SimpleReader — E-Book Reader

HTML-basierter E-Book-Reader für russische Bücher (z.B. «Война и мир» von Tolstoi).
Text-Vereinfachung in Sprachniveaus (C1/B2/B1/A2) über GLM-5.2, Übersetzung
Russisch ↔ Chinesisch.

---

## 🚀 Online stellen

Dieses Repo wird über **GitHub Pages** veröffentlicht (aus Russland zuverlässig
erreichbar, im Gegensatz zu EdgeOne/Tencent, die russische IPs blockieren).

URL nach dem Deploy: `https://stschaab.github.io/simplereader/`

---

## 🏗️ Architektur (Ziel)

| Schicht | Produkt | Zweck |
|---------|---------|-------|
| Frontend (statisch) | GitHub Pages | Reader-UI |
| KI-Modell | GLM-5.2 (Z.ai) | Vereinfachung & Übersetzung |
| KI-Aufruf | Proxy (später) | geschützter API-Key |

EdgeOne / CloudBase (Tencent) waren ursprünglich geplant, sind aber aus
Russland blockiert. Falls später gewünscht, kann das Hosting nach DE migriert werden.

---

## ✅ Checkliste

- [ ] GitHub-Repo `simplereader` anlegen
- [ ] Code pushen & GitHub Pages aktivieren
- [ ] EPUB-Parser + Absatz-Anzeige
- [ ] Flip-Navigation (ein Chunk pro Fenster, ohne Scrollen)
- [ ] Level-Umschalter C1/B2/B1/A2
- [ ] GLM-5.2 Vereinfachung
- [ ] Übersetzung Russisch ↔ Chinesisch
- [ ] Buchauswahl
