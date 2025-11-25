"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Plus,
  ShoppingBag,
  Utensils,
  Baby,
  Landmark,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const sections = [
  {
    name: "Kidzo",
    path: "/admin/kidzo",
    api: "/api/kidzo",
    icon: <Baby className="w-5 h-5" />,
    color: "#8884d8",
  },
  {
    name: "Restaurants",
    path: "/admin/restaurant",
    api: "/api/restaurant",
    icon: <Utensils className="w-5 h-5" />,
    color: "#82ca9d",
  },
  {
    name: "Shopping",
    path: "/admin/shopping",
    api: "/api/shopping",
    icon: <ShoppingBag className="w-5 h-5" />,
    color: "#ffc658",
  },
  {
    name: "Souk",
    path: "/admin/souk",
    api: "/api/souk",
    icon: <Landmark className="w-5 h-5" />,
    color: "#ff8042",
  },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Rediriger si pas connecté
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/signin");
    }
  }, [status, router]);

  const [counts, setCounts] = useState({});
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [maxSection, setMaxSection] = useState("");
  const [minSection, setMinSection] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      async function fetchCounts() {
        const results = await Promise.all(
          sections.map((section) =>
            fetch(section.api)
              .then((res) => res.json())
              .then((data) => ({ name: section.name, count: data.length }))
              .catch(() => ({ name: section.name, count: 0 }))
          )
        );

        const countsObj = {};
        const chartArr = [];

        let totalCount = 0;
        let max = { name: "", count: 0 };
        let min = { name: "", count: Infinity };

        results.forEach(({ name, count }) => {
          countsObj[name] = count;
          chartArr.push({ name, count });
          totalCount += count;

          if (count > max.count) max = { name, count };
          if (count < min.count) min = { name, count };
        });

        setCounts(countsObj);
        setChartData(chartArr);
        setTotal(totalCount);
        setMaxSection(max.name);
        setMinSection(min.name);
      }

      fetchCounts();
    }
  }, [status]);

  if (status === "loading") {
    return <p className="p-8 text-center">Chargement...</p>;
  }

  if (!session) {
    // Affichage temporaire avant redirection
    return <p className="p-8 text-center">Redirection vers la page de connexion...</p>;
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-100 p-10">
        {/* Profil */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border mb-6">
          <div className="flex items-center gap-4">
          <img
            src={session.user.image || "/img/profil.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border"
          />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {session.user.name || session.user.email || "Admin"}
              </p>
              <p className="text-sm text-gray-500">
                Bienvenue sur votre tableau de bord
              </p>
            </div>
          </div>
       
        </div>

        {/* ... ton code de dashboard (résumé, graphiques, etc.) ... */}

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Tableau de bord Menara Mall
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-4 rounded-xl shadow border text-center">
            <p className="text-gray-600 text-sm">Total éléments</p>
            <h2 className="text-3xl font-bold text-primary">{total}</h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border text-center">
            <p className="text-gray-600 text-sm">Section la plus remplie</p>
            <h2 className="text-xl font-semibold">{maxSection || "..."}</h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border text-center">
            <p className="text-gray-600 text-sm">Section la moins remplie</p>
            <h2 className="text-xl font-semibold">{minSection || "..."}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Nombre d’éléments par section
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6F0E18" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Répartition visuelle
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={sections[index].color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        
      </main>
    </div>
  );
}
