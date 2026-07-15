import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/BackHeader";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) refs.current[index + 1]?.focus();
  };

  return (
    <div className="min-h-full bg-gray-50">
      <BackHeader title="Verificación" />
      <div className="p-6 animate-[slideUp_0.3s_ease]">
        <div className="text-center mb-8 mt-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Ingresa el código</h2>
          <p className="text-sm text-gray-500 mt-1 px-4">
            Te enviamos un código de 4 dígitos a tu correo electrónico
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-14 h-14 text-center text-2xl font-bold rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          ))}
        </div>

        <button
          onClick={() => navigate("/reset-password")}
          className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
        >
          Verificar Código
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No recibiste el código?{" "}
          <button className="text-blue-600 font-semibold">Reenviar</button>
        </p>
      </div>
    </div>
  );
}
