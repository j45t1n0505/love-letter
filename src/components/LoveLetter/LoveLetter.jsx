import { motion } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa';

function LoveLetter({ opened }) {
  return (
    <motion.section
      className="letter-wrapper"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: opened ? 1 : 0.6, y: opened ? 0 : 24 }}
      transition={{ duration: 0.9 }}
    >
      <motion.div className="paper-card" whileHover={{ y: -6, rotate: -0.3, scale: 1.01 }}>
        <div className="paper-glow" />
        <div className="paper-fold" />
        <div className="paper-content">
          <p className="letter-label">Untuk cintaku tersayang</p>
          <h2>Untuk sosok yang membuat dunia ini selalu berbunga</h2>
          {opened && (
            <>
              <p>
                Aku ingin memberitahumu bahwa setiap hari biasa terasa jauh lebih lembut saat ada dirimu di dalamnya. Tertawamu adalah melodi yang selalu aku rindukan, dan kehadiranmu membuat momen paling sunyi terasa begitu hangat dan suci.
              </p>
              <p>
                Sejak saat pertama kita bertemu, aku menyimpan setiap kilau matamu dan setiap senyum yang mengembang pelan di sudut bibirmu. Ada sebuah rasa tenang yang hadir ketika namamu terbisik di dalam dadaku, dan dari situ aku tahu perjalanan ini bukan sekadar cerita biasa.
              </p>
              <p>
                Ketika kau menggenggam tanganku, seolah aku sedang memegang sesuatu yang sangat berharga—bukan dalam bentuk benda, melainkan dalam bentuk janji tanpa kata. Janji untuk selalu ada, untuk menjadi tempat kembali, untuk menjadi rahasia yang paling lembut di antara kita.
              </p>
              <p>
                Ada begitu banyak hal kecil yang kurindukan darimu: cahaya pagi di wajahmu, aroma kopi yang kita bagi, tawa yang meledak tiba-tiba saat kita mengingat lelucon sendiri, serta cara kau memandangku ketika aku lupa bagaimana harus berhenti khawatir dan mulai percaya.
              </p>
              <p>
                Hatimu adalah taman yang kukunjungi setiap hari; di sana kupetik inspirasi, kenyamanan, dan kekuatan. Kau mengajari aku betapa indahnya menjadi diri sendiri dan bahwa cinta yang paling nyata adalah yang menerima segala kekuranganku dengan kelembutan.
              </p>
              <p>
                Aku cinta bagaimana kita saling melengkapi. Kau memberiku keberanian saat aku ragu, dan aku berharap aku selalu bisa menjadi pelita di malam-malammu. Bersamamu, setiap langkah menjadi penuh makna, dan setiap mimpi terasa mungkin.
              </p>
              <p>
                Terima kasih untuk kehangatan tanganmu di genggamanku, untuk kebaikan di matamu, dan untuk cara cintamu membuat hidup terasa ringan, panjang, dan penuh kelembutan. Aku ingin terus menulis cerita kita dengan tinta yang tak pernah pudar.
              </p>
              <p>
                Kamu adalah tempat paling nyaman bagiku, pikiran paling manis yang selalu aku simpan, dan selamanya untukku. Aku akan tetap memilihmu, di setiap musim, di setiap detak jantung, selama napas ini masih bernyawa.
              </p>
              <div className="signature-row">
                <span>Dengan seluruh hati</span>
                <FaHeart />
                <span>Selamanya milikmu</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
      <div className="letter-dust">
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    </motion.section>
  );
}

export default LoveLetter;
