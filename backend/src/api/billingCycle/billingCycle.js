const restful = require('node-restful')
const mongoose = restful.mongoose

const creditSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o campo nome.'] },
    value: { type: Number, min: 0, required: [true, 'Informe o campo valor.'] }
})

const debitSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o campo nome.'] },
    value: { type: Number, min: 0, required: [true, 'Informe o campo valor.'] },
    status: { type: String, required: false, uppercase: true, enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})

const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o campo nome.'] },
    month: { type: Number, 
            min: [0, "O '{VALUE}' informado não é um mês válido."],
            max: [12, "O '{VALUE}' informado não é um mês válido."], 
            required: [true, 'Informe o campo mês.']
    },
    year: { type: Number, 
            min: [1970, "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'"], 
            max: [2100, "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'"],
            required: [true, 'Informe o campo ano.']
    },
    credits: [creditSchema],
    debits: [debitSchema]
})

module.exports = restful.model('BillingCycle', billingCycleSchema)