import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// ===================
// ✅ Middleware
// ===================
app.use(cors());
app.use(express.json());

// ===================
// ✅ MongoDB Connect
// ===================
mongoose
    .connect(
        "mongodb+srv://mrfaizmalik609_db_user:k8Gk57ZeE5H3F3Jo@project1.d5ur6je.mongodb.net/contactDB",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ===================
// ✅ Contact Schema
// ===================
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// ===================
// ✅ Checkout Schema
// ===================
const checkoutSchema = new mongoose.Schema({
    items: [
        {
            id: Number,
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    total: { type: Number, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

// ===================
// ✅ Test GET route
// ===================
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// ===================
// ✅ Contact POST route
// ===================
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            console.log("Contact validation failed:", req.body);
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        console.log("Contact saved:", req.body);
        res.status(201).json({ message: "Contact saved successfully!" });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: "Error saving contact" });
    }
});

// ===================
// ✅ Checkout POST route
// ===================
app.post("/api/checkout", async (req, res) => {
    try {
        const { items, total, customerName, email, address, paymentMethod } = req.body;

        console.log("Checkout request body:", req.body);

        if (!items || !total || !customerName || !email || !address || !paymentMethod) {
            console.log("Checkout validation failed");
            return res.status(400).json({ error: "All fields are required" });
        }

        const newOrder = new Checkout({ items, total, customerName, email, address, paymentMethod });
        await newOrder.save();

        console.log("Order saved successfully:", req.body);
        res.status(201).json({ message: "Order saved successfully!" });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Error saving order" });
    }
});

// ===================
// ✅ Start server
// ===================
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
