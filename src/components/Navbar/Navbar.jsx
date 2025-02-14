import React from "react";

const Navbar = () => {
  return (
    <div id="nav-bar" className="m-4 flex justify-center">
      <div
        id="large-screen"
        className="flex h-20 w-[96vw] items-center justify-between rounded-2xl bg-neutral-950 text-white"
      >
        <div id="logo" className="pl-6 font-medium">
          <span className="font-firacode text-neon-green pr-1 text-3xl">{`<`}</span>
          <span className="font-poppins text-2xl">Debanshu.Rout</span>
          <span className="text-neon-green px-1 text-2xl">{"/"}</span>
          <span className="font-firacode text-neon-green pr-1 text-3xl">
            {">"}
          </span>
        </div>
        <div id="menu" className="font-poppins flex gap-5">
          <div>About</div>
          <div>Resume</div>
          <div>Contact</div>
        </div>
        <div id="social">social</div>
      </div>
    </div>
  );
};

export default Navbar;
