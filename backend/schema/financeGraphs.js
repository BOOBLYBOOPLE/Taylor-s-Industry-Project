const mongoose = require('mongoose');

const financeGraphSchema = new mongoose.Schema({
    animationEnabled: Boolean,
    exportEnabled: Boolean,
    titleText: String,
    axisYPrefix: String,
    toolTipShared: Boolean,
    toolTipContent: String,
    fontSize: Number,
    data: { type: Array, default: [] }
});

module.exports = mongoose.model("FinanceGraph", financeGraphSchema);