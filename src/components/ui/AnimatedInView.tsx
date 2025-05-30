// components/AnimatedInView.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    delay?: number;
};

const AnimatedInView = ({ children, delay = 0 }: Props) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedInView;
