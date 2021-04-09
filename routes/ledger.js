const router = require('express').Router();
const LedgerController = require('./../controllers/ledger');
const auth = require('./../auth')

router.post('/', auth.verify, LedgerController.addTransaction);

router.get('/', LedgerController.getAll);

module.exports = router;