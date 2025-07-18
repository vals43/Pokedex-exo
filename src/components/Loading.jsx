import { motion } from 'framer-motion';
//bg-[#050816]
const LoadingScreen = () => {
  const magicPatternSymbol = <motion.svg width="120" height="120" viewBox="0 0 120 120" initial={{
    opacity: 0,
    scale: 0
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 1.5,
    delay: 0.5,
    ease: 'easeInOut'
  }} className="absolute z-20">
      <motion.circle cx="60" cy="60" r="40" stroke="#8A2BE2" strokeWidth="2" fill="none" initial={{
      pathLength: 0
    }} animate={{
      pathLength: 1
    }} transition={{
      duration: 2,
      delay: 0.5
    }} />
      <motion.polygon points="60,30 85,60 60,90 35,60" stroke="#00FFFF" strokeWidth="2" fill="none" initial={{
      pathLength: 0
    }} animate={{
      pathLength: 1
    }} transition={{
      duration: 2,
      delay: 1
    }} />
      <motion.circle cx="60" cy="60" r="10" fill="#FF00FF" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1,
      delay: 2
    }} />
    </motion.svg>;
  return <motion.div className="fixed inset-0 bg-[#050816] flex items-center justify-center z-50" exit={{
    opacity: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({
        length: 50
      }).map((_, i) => <div key={i} className="absolute rounded-full bg-purple-600 opacity-20" style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 6 + 2}px`,
        height: `${Math.random() * 6 + 2}px`,
        animation: `floatParticle ${Math.random() * 10 + 5}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`
      }} />)}
      </div>
      <div className="relative flex flex-col items-center justify-center z-30">
        {magicPatternSymbol}
        <motion.h2 className="mt-40 text-xl font-light text-purple-300" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 2,
        duration: 1
      }}>
          Initialisation du Pokedex
        </motion.h2>
        <motion.div className="mt-4 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" initial={{
        width: 0
      }} animate={{
        width: 200
      }} transition={{
        delay: 0.7,
        duration: 2
      }} />
      </div>
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </motion.div>;
};
export default LoadingScreen;