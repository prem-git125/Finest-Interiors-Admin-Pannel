import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { MostAppliedDesignerChart } from '../../../thunks/MostAppliedDesignerChart';

const DesignerBarChart = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.MostAppliedDesignerChart);

    useEffect(() => {
        dispatch(MostAppliedDesignerChart());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Transform data for the chart
    const chartData = data?.map((item) => ({
        name: item.user.firstName, // Designer's name
        applications: item.application_count, // Number of applications
    }));

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" fill="#8884d8" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DesignerBarChart;

