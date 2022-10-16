import React from "react";
import { JBLQuantum } from "../../asset/image/image";
const HomeSpecialPro = () => {
  return (
    <div className="w-full bg-slate-300 p-2 flex justify-center items-center ">
      <div className="w-1/3 h-full object-cover">
        <img src={JBLQuantum} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between flex-1 gap-y-2">
        <div className="text-lg font-bold uppercase">JBL TUNE 750TNC</div>
        <div className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde
          necessitatibus id enim laudantium dicta repellat pariatur sed rem
          nostrum ea placeat eligendi, soluta, modi incidunt ducimus eos iusto
          explicabo! Fugiat ex tempora ipsum perferendis nisi deleniti odit, aut
          qui quod eaque fuga repellendus deserunt voluptatum nobis modi
          quibusdam distinctio architecto corporis beatae, hic dolore debitis
          sed quidem ea. Voluptates! Tempora perferendis a alias reprehenderit
          incidunt dignissimos in explicabo velit impedit earum! Velit tempora
          tempore suscipit corporis at labore quod soluta in enim, omnis
          explicabo? Vitae tempore placeat fuga ad? Accusamus qui nemo autem
          esse aperiam officiis nihil ipsam eaque. Nesciunt, facilis libero.
          Fuga animi nihil consectetur magni consequatur sit odio, libero dolore
          cupiditate itaque blanditiis. Ipsa nemo recusandae distinctio? Ab
          nihil est voluptates officiis quos natus ipsam ipsum. Exercitationem
          dolores reiciendis, officiis placeat deserunt corrupti! Doloribus
          labore expedita eveniet ut. Dignissimos odit necessitatibus tempora
          delectus reprehenderit atque laudantium doloremque!
        </div>
        <div className="flex justify-center items-center w-[120px] bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] border-2 border-black duration-200 cursor-pointer p-2 uppercase">
          Shop now
        </div>
      </div>
    </div>
  );
};

export default HomeSpecialPro;
