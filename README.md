# **API REST**
---

## **Trabajo Practico N° 3 - Asignatura Sistemas Distribuidos**

---

Integrantes:
* Noelia
* Camila
* Francisco
* Imanol

---

## **Carpeta ./data**

Dentro de `./data` estan los archivos `json` de persistencia

* `./data/turnos.json`                     --> Turnos tomados por clientes
* `./data/turnos_disponibles.json`         --> Turnos disponibles para ser tomados
* `./data/turnos_disponibles_orig.json`    --> Archivo para re-inicializar turnos_disponibles.json en caso de borrado accidental



---
## **Funcionalidad de la API de turnos**

---
### 1. Ver todos los turnos tomados <br>

>  ```GET /api/turnos```

--- 
### 2. Ver el turno tomado por un usuario (filtrado por email) <br>

>  `GET /api/turnos/:email`
---

### 3. Tomar un turno <br>

> `POST /api/turnos`<br>
*  Primero se  verifica que haya turno disponible 
* En el body, en formato json se debe indicar: <br>
```javascript
{   "fecha": fecha,
    "email": email,
    "branchId": branchId
}
```
---
### 4. Modificar un turno (filtrado por email)<br>

> PUT /api/turnos/:email


* Primero se verifica que exista un turno reservado con ese mail (en turnos.json)
* Segundo se verifica que el nuevo turno este disponible (que este en turnos_disponibles.json)
* Tercero, en el body se debe indicar en formato json el nuevo turno que se desea. Si se omite fecha o branchId, la query se hace con el parametro almacenado, y se modificará sólo 1
```javascript
{
    "fecha": fecha,    
    "branchId": branchId
}
```
* Cuarto, se libera el turno anterior (se vuelve a guardar en turnos_disponibles.json)

---
### 5. Eliminar un turno (filtrado por email)

> DELETE /api/turnos/:email

* Primero, se verifica que exista un turno reservado con ese mail (en turnos.json)
* Segundo, si existe, se remueve del archivo turnos.json
* Tercero, se agrega nuevamente al pool de turnos disponibles en turnos_disponibles.json

---