import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setFilterQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [filters, setFilters] = useState({ Location: '', Industry: '', Salary: '' });
    const dispatch = useDispatch();
    
    const changeHandler = (value, filterType) => {
        setFilters((prev) => ({ ...prev, [filterType]: value }));
    }
    
    useEffect(()=>{
        dispatch(setFilterQuery(filters));
    },[filters, dispatch]);
    
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                fitlerData.map((data, index) => (
                    <div key={index} className="mt-4">
                        <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                        <RadioGroup value={filters[data.fitlerType]} onValueChange={(value) => changeHandler(value, data.fitlerType)}>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </RadioGroup>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCard