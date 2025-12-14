type ReservationForm = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
};

import { ref, push } from "firebase/database";
import { db } from "../services/firebase";
import { useState } from "react";

export default function Reservation() {
  const [form, setForm] = useState<ReservationForm>({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    await push(ref(db, "reservations"), form);

    alert("Saved!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 32 }}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <select name="service" onChange={handleChange}>
        <option value="">Select Service</option>
        <option value="Haircut">Haircut</option>
        <option value="Coloring">Coloring</option>
      </select>

      <input type="date" name="date" onChange={handleChange} />
      <input type="time" name="time" onChange={handleChange} />

      <button type="submit">Reserve</button>
    </form>
  );
}
