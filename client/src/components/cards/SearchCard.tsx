import { Box, Typography,useMediaQuery } from '@mui/material';
import * as React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';

 interface CardProp {
       item:{
        [key: string]: any;
        name:string,
        first_air_date: string,
        vote_average:number,
        poster_path: string,
        id:number
       },
       setOpenBox: React.Dispatch<React.SetStateAction<boolean>>
       setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchCard (props: CardProp) {
    const isNonMobile = useMediaQuery("(min-width:640px)");
    const navigate = useNavigate()
  return (
    <Box className="flex flex-row w-full sm:h-[70px] h-[auto] border-b border-black cursor-pointer hover:bg-gray-300" onClick={(e)=>{
        props.setOpenBox(value => !value)
        props.setSearch("")
        navigate(`/movieDetails/${props.item.id}`)
    }}>
        {/* Image */}
        <img src={props.item.poster_path ? `https://image.tmdb.org/t/p/w500/${props?.item?.poster_path}`:"https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"} alt="Movie Pic"  className='w-[60px]  h-full p-1'/>

        <Box className="flex flex-col justify-center w-full h-full ml-2">
            {isNonMobile ? 
            (
                <Typography className='underline text-md'>{props?.item?.name}</Typography>
            ) 
            : 
            (
                props.item.name.length > 40?
                (
                    <Typography className='underline text-[14px]'>{props?.item?.name.slice(0,50)}<span>...</span></Typography>
                )
                :
                (
                    <Typography className='underline text-[14px]'>{props?.item?.name}</Typography>
                )
            )
            }

            <Box>
                <span className='sm:text-sm text-[12px]'>First Air Date: {props?.item?.first_air_date.slice(0,4)}</span>
                <FiberManualRecordIcon className='text-[8px] mx-3'/>
                <span className='sm:text-sm text-[12px]'>Rating: {props?.item?.vote_average.toFixed(2)}/10</span>
            </Box>
        </Box>
    </Box>
  );
}

//src={item?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.poster_path}`:"https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"} alt="Movie Pic" 

// {props.item.name.length > 40? 
    //  (
    //      <Typography className='underline text-md'>{props?.item?.name.slice(0,50)}<span>...</span></Typography>
    //  )
    //  :
    //  (
    //      <Typography className='underline text-md'>{props?.item?.name}</Typography>
    //  )
//     }