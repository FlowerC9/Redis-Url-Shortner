import * as React from 'react';



const Header: React.FunctionComponent= () => {
  return (
    <div className='bg-slate-900'>
        <div className='container p-2 mx-auto'>
            <nav className='py-5'>
                <div className='text-base text-white'>URLShortner</div>
            </nav>
        </div>
    </div>
  );
};

export default Header;
