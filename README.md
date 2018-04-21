# Projekt - Grafika Komputerowa

Projekt wykonany w języku JavaScript przy pomocy elementu canvas.

## Instrukcja
- `Strzałki` - translacja (lewo, prawo, góra, dół)
- `W` - translacja w przód
- `S` - translacja w tył
- `T`, `G` - rotacja wokół osi OX
- `F`, `H` - rotacja wokół osi OY
- `R`, `Y` - rotacja wokól osi OZ
- `+`, `-` - przyblienie/oddalenie
- `Shift` - włącz/wyłącz malowanie ścian

## Wnioski
Efekt perspektywy wygląda lekko nienaturalnie.
Pewna nienaturalność nasila się na brzegach ekranu oraz w osi Z względem kamery.
Rotacja i translacja się odbywa się bezwzględnie, co wiąże się ze sposobem implementacji projektu.
Widać znaczne różnice pomiędzy zoomem, a translacją.
W translacji zmienia się wzajemne położenie punktów.
W zoomie obraz jest po prostu powiększan i pomniejszany.
