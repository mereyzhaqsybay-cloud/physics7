import { motion } from 'motion/react';
import { Table, Database, Info } from 'lucide-react';

export default function TablesSection() {
  const tables = [
    {
      title: "Кейбір заттардың тығыздығы (кг/м³)",
      data: [
        { name: "Осмий", value: "22 600" },
        { name: "Алтын", value: "19 300" },
        { name: "Қорғасын", value: "11 300" },
        { name: "Күміс", value: "10 500" },
        { name: "Мыс", value: "8 900" },
        { name: "Темір / Болат", value: "7 800" },
        { name: "Алюминий", value: "2 700" },
        { name: "Мәрмәр", value: "2 700" },
        { name: "Шыны", value: "2 500" },
        { name: "Мұз", value: "900" },
        { name: "Сынап", value: "13 600" },
        { name: "Күкірт қышқылы", value: "1 840" },
        { name: "Теңіз суы", value: "1 030" },
        { name: "Таза су", value: "1 000" },
        { name: "Май (өсімдік)", value: "920" },
        { name: "Мұнай / Кэросин", value: "800" },
        { name: "Бензин", value: "710" },
        { name: "Ауа", value: "1.29" }
      ]
    },
    {
      title: "Физикалық тұрақтылар",
      data: [
        { name: "Жердегі еркін түсу үдеуі (g)", value: "9.81 Н/кг" },
        { name: "Гравитациялық тұрақты (G)", value: "6.67 * 10⁻¹¹ Н·м²/кг²" },
        { name: "Атмосфералық қысым (нормаль)", value: "101 325 Па (760 мм сын. бағ.)" },
        { name: "Жарық жылдамдығы (вакуумда)", value: "3 * 10⁸ м/с" },
        { name: "Абсолют нөл (температура)", value: "-273.15 °C" },
        { name: "Элементар заряд (e)", value: "1.6 * 10⁻¹⁹ Кл" }
      ]
    },
    {
      title: "Меншікті жылу сыйымдылығы (Дж/кг·°C)",
      data: [
        { name: "Су", value: "4200" },
        { name: "Мұз", value: "2100" },
        { name: "Спирт", value: "2500" },
        { name: "Май", value: "2100" },
        { name: "Алюминий", value: "920" },
        { name: "Темір", value: "460" },
        { name: "Мыс", value: "400" },
        { name: "Сынап", value: "140" },
        { name: "Қорғасын", value: "140" },
        { name: "Алтын", value: "130" }
      ]
    },
    {
      title: "Үйкеліс коэффициенттері (шамамен)",
      data: [
        { name: "Болат болатта (майланған)", value: "0.05" },
        { name: "Болат болатта (құрғақ)", value: "0.15" },
        { name: "Ағаш ағашта", value: "0.2 - 0.5" },
        { name: "Резеңке бетонда (құрғақ)", value: "0.9" },
        { name: "Металл мұзда", value: "0.02" }
      ]
    },
    {
      title: "SI өлшем бірліктерінің ондық еселіктері",
      data: [
        { name: "Тера (Т)", value: "10¹²" },
        { name: "Гига (Г)", value: "10⁹" },
        { name: "Мега (М)", value: "10⁶" },
        { name: "Кило (к)", value: "10³" },
        { name: "Гекто (г)", value: "10²" },
        { name: "Деци (д)", value: "10⁻¹" },
        { name: "Санти (с)", value: "10⁻²" },
        { name: "Милли (м)", value: "10⁻³" },
        { name: "Микро (мк)", value: "10⁻⁶" },
        { name: "Нано (н)", value: "10⁻⁹" }
      ]
    },
    {
      title: "Күн жүйесіндегі планеталар",
      data: [
        { name: "Меркурий (орташа радиус)", value: "2 440 км" },
        { name: "Шолпан (орташа радиус)", value: "6 052 км" },
        { name: "Жер (орташа радиус)", value: "6 371 км" },
        { name: "Марс (орташа радиус)", value: "3 390 км" },
        { name: "Юпитер (орташа радиус)", value: "69 911 км" },
        { name: "Сатурн (орташа радиус)", value: "58 232 км" },
        { name: "Уран (орташа радиус)", value: "25 362 км" },
        { name: "Нептун (орташа радиус)", value: "24 622 км" }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {tables.map((table, idx) => (
        <motion.section 
          key={idx}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="card overflow-hidden"
        >
          <h2 className="card-title select-none">
            <Database size={24} className="text-primary" />
            <span>{table.title}</span>
          </h2>
          
          <div className="mt-6 border border-primary/10 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-sm bg-white overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-0">
              <thead>
                <tr className="bg-primary/5">
                  <th className="px-8 py-5 text-sm font-black text-primary uppercase tracking-widest border-b border-primary/10">Атауы</th>
                  <th className="px-8 py-5 text-sm font-black text-primary uppercase tracking-widest border-b border-primary/10">Мәні</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {table.data.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-primary/[0.02] transition-colors group">
                    <td className="px-8 py-4 text-sm text-slate-700 font-bold group-hover:text-primary transition-colors">{row.name}</td>
                    <td className="px-8 py-4 text-base text-primary font-black font-mono tracking-tight">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 bg-accent/20 border-2 border-primary/10 rounded-[3rem] flex items-start gap-6 shadow-inner ring-1 ring-primary/5"
      >
        <div className="p-4 bg-white rounded-2xl shadow-sm text-primary">
          <Info size={28} />
        </div>
        <div>
          <h4 className="font-black text-primary text-xl mb-2 tracking-tight">Мәлімет үшін</h4>
          <p className="text-base text-primary/70 leading-relaxed font-medium">
            Бұл кестелерде физикалық есептерді шығаруға қажетті негізгі мәліметтер жинақталған. 
            Есеп шығару барысында осы мәндерді қолдану ұсынылады.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
