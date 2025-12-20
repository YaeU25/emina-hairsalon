import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { db } from "../services/firebase";
import { ref, onValue, set } from "firebase/database";

type ReservationForm = {
  name: string;
  phone: string;
  service: string;
};

const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;
const STEP = 30; // minutes
const phoneRegex = /^(\+33|0)[1-9][0-9]{8}$/;

function generateTimeSlots() {
  const slots: string[] = [];
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += STEP) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

export default function ReservationPage() {
  const [form, setForm] = useState<ReservationForm>({
    name: "",
    phone: "",
    service: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  /* ---------------- LOAD BOOKED SLOTS ---------------- */
  useEffect(() => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toLocaleDateString("en-CA");
    const reservationsRef = ref(db, `reservations/${dateStr}`);

    onValue(reservationsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setBookedTimes(Object.keys(data));
    });
  }, [selectedDate]);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Veuillez sélectionner une date et une heure.");
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      alert(
        "Veuillez entrer un numéro de téléphone valide (ex: 0612345678 ou +33612345678)."
      );
      return;
    }

    const dateStr = selectedDate.toLocaleDateString("en-CA");

    await set(ref(db, `reservations/${dateStr}/${selectedTime}`), {
      ...form,
    });

    alert("Votre réservation a été enregistrée !");
    setForm({ name: "", phone: "", service: "" });
    setSelectedTime(null);
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Nav />

      <h1 style={{ textAlign: "center", marginTop: 20 }}>
        Réservez votre rendez-vous
      </h1>

      {/* DATE PICKER */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>

      {/* TIME SLOTS */}
      {selectedDate && (
        <div className="time-slots">
          {generateTimeSlots().map((time) => {
            const isBooked = bookedTimes.includes(time);
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                disabled={isBooked}
                className={`${isSelected ? "selected" : ""} ${
                  isBooked ? "booked" : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}

      {/* FORM */}
      {selectedDate && selectedTime && (
        <form onSubmit={handleSubmit} className="reservation-form">
          <h3>
            Réserver le {selectedDate.toLocaleDateString()} à {selectedTime}
          </h3>

          <label>
            Nom
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Téléphone
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Service
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Choisir un service</option>
              <option value="Haircut">Coupe de cheveux</option>
              <option value="Coloring">Coloration</option>
            </select>
          </label>

          <button type="submit">Réserver</button>
        </form>
      )}

      <Footer />
    </div>
  );
}
