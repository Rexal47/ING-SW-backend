const Asamblea = require('../models/asamblea');

const createAsamblea = (req, res) => {
    const { name, tipo } = req.body
    const newAsamblea = new Asamblea({
        name,
        tipo
    })
    newAsamblea.save((error, asamblea) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear la asamblea" })
        }
        return res.status(201).send(asamblea)
    })
}

const getAsambleas = (req, res) => {
    Asamblea.find({}).populate({ path: 'asistencia' }).exec((error, asambleas) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (asambleas.length === 0) {
            return res.status(404).send({ message: "No se encontraron asambleas" })
        }
        return res.status(200).send(asambleas)
    })
}

const updateAsamblea = (req, res) => {
    const { id } = req.params
    Asamblea.findByIdAndUpdate(id, req.body, (error, asamblea) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar la asamblea" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No se encontro el la asamblea" })
        }
        return res.status(200).send({ message: "Asamblea modificada" })
    })
}

const deleteAsamblea = (req, res) => {
    const { id } = req.params
    Asamblea.findByIdAndDelete(id, (error, asamblea) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido eliminar la asamblea" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No se ha podido encontrar la asamblea" })
        }
        return res.status(200).send({ message: "Se ha eliminado la asamblea de forma correcta" })
    })
}

const getAsamblea = (req, res) => {
    const { id } = req.params
    Asamblea.findById(id, (error, asamblea) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido modificar la asamblea" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No se ha podido encontrar la asamblea" })
        }
        return res.status(200).send(asamblea)
    })
}

module.exports = {
    createAsamblea,
    getAsambleas,
    updateAsamblea,
    deleteAsamblea,
    getAsamblea
}