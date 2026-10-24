import { setAllJobs, setJobsError, setJobsLoading } from '@/redux/jobSlice'
import { getAllJobs } from '@/services/jobService'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const controller = new AbortController();
        const fetchAllJobs = async () => {
            dispatch(setJobsLoading(true));
            dispatch(setJobsError(null));
            try {
                const jobs = await getAllJobs(searchedQuery, controller.signal);
                dispatch(setAllJobs(jobs));
            } catch (error) {
                if (!controller.signal.aborted) {
                    dispatch(setJobsError(error.message));
                }
            } finally {
                if (!controller.signal.aborted) {
                    dispatch(setJobsLoading(false));
                }
            }
        }
        fetchAllJobs();
        return () => controller.abort();
    },[searchedQuery, dispatch])
}

export default useGetAllJobs