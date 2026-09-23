import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicCourses } from '../Redux/User/Userslice';

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    publicCourses,
    publicCoursesLoading,
    publicCoursesError
  } = useSelector((state) => state.user);

  const categories = ["All","Web Development","Digital Marketing","Cyber Security","Data Science","App Development","UI/UX Design","Graphic Design"];

  const [activeCategory,setActiveCategory] = useState("All");
  const [search,setSearch] = useState("");
  const [showFilter,setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(getPublicCourses());
  }, [dispatch]);

  const filteredCourse = useMemo(()=>{
    let list = activeCategory === "All"
      ? publicCourses
      : publicCourses.filter((course)=>course.category === activeCategory);

    if(search.trim()){
      const keyword = search.toLowerCase();

      list = list.filter((course)=>
        course.title?.toLowerCase().includes(keyword)
      );
    }

    return list;
  },[publicCourses,activeCategory,search])

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <section className='py-16 lg:py-20 bg-slate-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-5'>

       <div className='max-w-3xl'>
        <span className='inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm'>
          Explore Programming Courses
        </span>

        <h1 className='mt-5 text-4xl lg:text-5xl font-black text-slate-900 leading-tight'>
          Find The Perfect Course
          <span className='text-indigo-600'> For Your Career</span>
        </h1>

        <p className="mt-5 text-slate-600 text-lg leading-8">
            Learn from experienced mentors, build real-world
            projects and become job-ready with industry-focused
            programming courses.
        </p>
       </div>

       <div className='mt-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5'>

        <div className='w-full lg:max-w-lg'>
         <div className='flex items-center gap-3 bg-white rounded-2xl border border-slate-200 px-5 py-4 shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition'>

          <Search size={20} className='text-slate-400'/>

          <input
            className='flex-1 outline-none bg-transparent text-slate-700'
            type="text"
            placeholder='Search Your Favourite Course...'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

         </div>
        </div>

        <div className='hidden lg:flex flex-wrap gap-3'>
         {categories.map((category)=>(
          <button
            key={category}
            onClick={()=>setActiveCategory(category)}
            className={`px-5 py-3 rounded-full font-medium transition cursor-pointer ${
              activeCategory === category
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
            }`}
          >
            {category}
          </button>
        ))}
        </div>

        <button
          className='lg:hidden flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-3 shadow-lg'
          onClick={()=>setShowFilter(true)}
        >
          <SlidersHorizontal size={18}/>
          Filters
        </button>

       </div>

       <div className='mt-14 grid lg:grid-cols-[280px_1fr] gap-10'>

       <aside className='hidden lg:block'>
        <div className='sticky top-24 bg-white rounded-3xl border border-slate-200 shadow-sm p-6'>

         <h2 className='text-xl font-bold mb-6'>
          Categories
         </h2>

         <div className='space-y-3'>
          {categories.map((category)=>(
            <button
              key={category}
              onClick={()=>setActiveCategory(category)}
              className={`w-full text-left px-5 py-3 cursor-pointer rounded-xl transition ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
         </div>

        </div>
       </aside>

       <div>

         <div className='flex items-center justify-between mb-8'>

         <div>
          <h2 className='text-2xl font-bold text-slate-900'>
            {activeCategory === "All"?"All Courses":activeCategory}
          </h2>

          <p className='text-slate-500 mt-1'>
            {publicCoursesLoading
              ? "Loading Courses..."
              : `${filteredCourse.length} Courses Available`}
          </p>
         </div>

         <div className='hidden md:flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2'>
          <span className='w-2.5 h-2.5 rounded-full bg-green-500'></span>
          <span className='text-sm text-slate-600'>Updated Daily</span>
         </div>

         </div>

         {publicCoursesLoading && (
           <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
             {[1,2,3,4,5,6].map((item)=>(
               <div
                 key={item}
                 className='bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm animate-pulse'
               >
                 <div className='w-full h-56 bg-slate-200'></div>

                 <div className='p-6'>
                   <div className='h-4 bg-slate-200 rounded w-1/3'></div>
                   <div className='h-6 bg-slate-200 rounded mt-5 w-full'></div>
                   <div className='h-4 bg-slate-200 rounded mt-3 w-4/5'></div>
                   <div className='h-10 bg-slate-200 rounded-xl mt-6'></div>
                 </div>
               </div>
             ))}
           </div>
         )}

         {!publicCoursesLoading && publicCoursesError && (
           <div className='bg-white rounded-3xl border border-slate-200 py-24 mt-8 text-center'>

            <div className='w-20 h-20 rounded-full bg-red-50 mx-auto flex items-center justify-center text-3xl'>
              ⚠️
            </div>

            <h3 className='mt-6 text-2xl font-bold text-slate-800'>
              Failed To Load Courses
            </h3>

            <p className='mt-3 text-slate-500 max-w-md mx-auto leading-7'>
              {publicCoursesError}
            </p>

            <button
              className='mt-8 px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition'
              onClick={()=>dispatch(getPublicCourses())}
            >
              Try Again
            </button>

           </div>
         )}

         {!publicCoursesLoading &&
          !publicCoursesError &&
          filteredCourse.length > 0 && (
           <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>

            {filteredCourse.map((course)=>(
              <CourseCard
                key={course._id}
                item={course}
                onClick={()=>navigate(`/booking/${course._id}`)}
              />
            ))}

           </div>
         )}

         {!publicCoursesLoading &&
          !publicCoursesError &&
          filteredCourse.length === 0 && (
          <div className='bg-white rounded-3xl border border-slate-200 py-24 mt-8 text-center'>

           <div className='w-20 h-20 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-3xl'>
             📚
           </div>

           <h3 className='mt-6 text-2xl font-bold text-slate-800'>
            No Courses Found
           </h3>

           <p className='mt-3 text-slate-500 max-w-md mx-auto leading-7'>
             We couldn't find any course matching your
             search. Try another keyword or select a
             different category.
           </p>

           <button
             className='mt-8 px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition'
             onClick={()=>{
               setSearch("");
               setActiveCategory("All");
             }}
           >
             Reset Filters
           </button>

          </div>
         )}

       </div>
       </div>
      </div>

      {showFilter && (
        <div className='fixed inset-0 z-50 bg-black/50 lg:hidden'>

         <div className='absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl'>

          <div className='flex items-center justify-between p-6 border-b'>

           <h2 className='text-xl font-bold'>
            Categories
           </h2>

           <button
             className='w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center'
             onClick={()=>setShowFilter(false)}
           >
             <X size={20}/>
           </button>

          </div>

          <div className='p-6 space-y-3'>

           {categories.map((category)=>(
            <button
              className={`w-full text-left px-5 py-3 rounded-xl transition ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700"
              }`}
              key={category}
              onClick={()=>{
                setActiveCategory(category);
                setShowFilter(false);
              }}
            >
              {category}
            </button>
           ))}

          </div>
         </div>
        </div>
      )}
    </section>
  )
}

export default Course


const CourseCard = ({item,onClick}) => {
  return(
    <div
      className='group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500'
      onClick={onClick}
    >

     <div className='relative overflow-hidden'>

      <img
        className='w-full h-56 object-cover transition duration-700 group-hover:scale-110'
        src={item.image}
        alt=""
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

      <span className='absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-slate-700'>
        {item.category}
      </span>

      <span className='absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-bold shadow-lg'>
        Bestseller
      </span>

      <div className='absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg'>
        ${item.price}
      </div>

     </div>

     <div className='p-6'>

      <div className='flex items-center justify-between'>

       <div className='flex items-center gap-1'>

        <span className="text-yellow-400">
          ★★★★★
        </span>

        <span className="text-sm text-slate-500">
          (4.9)
        </span>

       </div>

       <span className="text-green-600 text-sm font-semibold">
          ● Available
       </span>

      </div>

      <h2 className='mt-4 text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition'>
        {item.title}
      </h2>

      <p className='mt-3 text-sm text-slate-500 leading-6 line-clamp-2'>
        Learn with hands-on projects, industry experts,
        real-world assignments and become job ready.
      </p>

      <div className='flex items-center justify-between mt-5'>

       <div className='text-center flex-1'>

        <p className='text-xs text-slate-400'>
          Level
        </p>

        <h4 className='font-semibold text-slate-800 mt-1'>
          {item.level}
        </h4>

       </div>

       <div className='w-px h-10 bg-slate-200'>
       </div>

       <div className='text-center flex-1'>

         <p className='text-xs text-slate-400'>
           Duration
         </p>

         <h4 className='font-semibold text-slate-800 mt-1'>
           {item.duration}
         </h4>

       </div>

      </div>

      <div className='mt-6 flex items-center gap-4 border-t border-slate-100 pt-5'>

       <img
         className='w-14 h-14 rounded-full object-cover border-2 border-indigo-100'
         src={item.mentor?.image}
         alt=""
       />

       <div>

        <h4 className='font-semibold text-slate-900'>
          {item.mentor?.name}
        </h4>

        <p className='text-sm text-slate-500'>
          {item.mentor?.role}
        </p>

       </div>

      </div>

      <button
        type="button"
        className='mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
        onClick={(e)=>{
          e.stopPropagation();
          onClick();
        }}
      >
        Enroll Now
      </button>

     </div>
    </div>
  )
}

