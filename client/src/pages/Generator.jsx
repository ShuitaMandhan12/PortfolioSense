// src/pages/Generator.jsx
import MainForm from '../components/Form/MainForm';

// Simplified generator page that just renders the MainForm
export default function Generator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00178F] via-[#4B96FF] to-[#FFA2B6]">
      <MainForm />
    </div>
  );
}