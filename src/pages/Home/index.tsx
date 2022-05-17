import React, { useEffect, useState } from 'react';

import { test1 } from '@/services/demo';

const Home: React.FC = () => {

  const [count, setCount] = useState<number>()
  useEffect(() => {
    test1().then(res => {
      setCount(res.data)
    })
  }, [])
  return (
    <div>首页{count}</div>
  )
}

export default Home