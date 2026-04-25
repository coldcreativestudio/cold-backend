const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    telefone: String,
    whatsapp: String,
    email: String,
    endereco: { rua: String, bairro: String, cidade: String, estado: String, cep: String, lat: Number, lng: Number },
    nicho: String,
    temSite: { type: Boolean, default: false },
    temInstagram: Boolean,
    instagram: String,
    fotos: [String],
    avaliacao: Number,
    totalAvaliacoes: Number,
    horarioFuncionamento: String,
    previewUrl: String,
    status: { type: String, enum: ['novo', 'contatado', 'respondeu', 'em_negociacao', 'fechado', 'perdido', 'descartado'], default: 'novo' },
    valorFechado: Number,
    dataCriacao: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);

