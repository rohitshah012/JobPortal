import { useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import Job from '../components/Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const { allJobs, jobsLoading, jobsError } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[dispatch])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                {jobsLoading ? (
                    <p className="text-gray-500">Loading job listings...</p>
                ) : jobsError && allJobs.length === 0 ? (
                    <p className="text-red-600">{jobsError}</p>
                ) : allJobs.length === 0 ? (
                    <p className="text-gray-500">No jobs are available yet. Please check back soon.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {allJobs.map((job) => <Job key={job._id} job={job} />)}
                    </div>
                )}

            </div>
        </div>
    )
}

export default Browse
