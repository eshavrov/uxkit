import React from 'react';

import s from './Color.module.css';

export const Color = ({ token }: any) => {
  return <div className={s.token} style={{
    backgroundColor: `var(${token})`
  }}>{token}</div>
}

export const Colors = () => {
  return <div className={s.panel}>
    <div >
      <Color token="--white-1" />
    </div>
    <div >
      <Color token="--white-a1" />
      <Color token="--white-a2" />
      <Color token="--white-a3" />
      <Color token="--white-a4" />
      <Color token="--white-a5" />
      <Color token="--white-a6" />
      <Color token="--white-a7" />
      <Color token="--white-a8" />
      <Color token="--white-a9" />
      <Color token="--white-a10" />
      <Color token="--white-a11" />
      <Color token="--white-a12" />
    </div>
    <div>
      <Color token="--gray-1" />
      <Color token="--gray-2" />
      <Color token="--gray-3" />
      <Color token="--gray-4" />
      <Color token="--gray-5" />
      <Color token="--gray-6" />
      <Color token="--gray-7" />
      <Color token="--gray-8" />
      <Color token="--gray-9" />
      <Color token="--gray-10" />
      <Color token="--gray-11" />
      <Color token="--gray-12" />
    </div>
    <div>
      <Color token="--gray-a1" />
      <Color token="--gray-a2" />
      <Color token="--gray-a3" />
      <Color token="--gray-a4" />
      <Color token="--gray-a5" />
      <Color token="--gray-a6" />
      <Color token="--gray-a7" />
      <Color token="--gray-a8" />
      <Color token="--gray-a9" />
      <Color token="--gray-a10" />
      <Color token="--gray-a11" />
      <Color token="--gray-a12" />
    </div>

    <div>
      <Color token="--accent-1" />
      <Color token="--accent-2" />
      <Color token="--accent-3" />
      <Color token="--accent-4" />
      <Color token="--accent-5" />
      <Color token="--accent-6" />
      <Color token="--accent-7" />
      <Color token="--accent-8" />
      <Color token="--accent-9" />
      <Color token="--accent-10" />
      <Color token="--accent-11" />
      <Color token="--accent-12" />
    </div>
    <div>
      <Color token="--accent-a1" />
      <Color token="--accent-a2" />
      <Color token="--accent-a3" />
      <Color token="--accent-a4" />
      <Color token="--accent-a5" />
      <Color token="--accent-a6" />
      <Color token="--accent-a7" />
      <Color token="--accent-a8" />
      <Color token="--accent-a9" />
      <Color token="--accent-a10" />
      <Color token="--accent-a11" />
      <Color token="--accent-a12" />
    </div>
  </div>;
}
