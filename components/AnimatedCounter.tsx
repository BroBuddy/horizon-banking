'use client';

import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <p>
        <CountUp
            duration={1}
            decimals={2}
            decimal=","
            prefix="$"
            end={amount}
        />
    </p>
  )
}

export default AnimatedCounter