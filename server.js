require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const scraperRoutes = require('./routes/scraper');
const { startCronJobs } = require('./services/schedulerService');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão e Rotas
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/scraper', scraperRoutes);

// Agendamentos Automáticos
startCronJobs();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Cold Hunter 3000 rodando na porta ${PORT}`));