/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import Charts from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { border, borderBottom } from '@mui/system';

const Chart = () => {
  const chartRef = useRef(null);
  const { zingcharts } = useSelector((state) => state.app);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // Hủy bỏ biểu đồ cũ nếu có trước khi tạo mới
    if (chart) {
      chart.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const label = zingcharts?.times
      ?.filter((e) => e.hour % 2 === 0)
      .map((item) => item.hour);

    const datasets = [];
    for (let i = 0; i < 3; i++) {
      if (zingcharts?.items) {
        datasets.push(
          zingcharts?.items[Object.keys(zingcharts?.items)[i]]
            .filter((i) => i.hour % 2 === 0)
            ?.map((o) => o.counter)
        );
      }
    }

    const myChart = new Charts(ctx, {
      type: 'line',
      data: {
        labels: label,
        datasets: datasets.map((data, index) => ({
          label: `Dataset ${index + 1}`,
          data: data,
          fill: true,
          borderColor: index === 0 ? 'blue' : index === 1 ? 'red' : 'yellow',
          tension: 0.5,
        })),
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart - Cubic interpolation mode',
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value',
            },
            suggestedMin: -10,
            suggestedMax: 200,
          },
        },
      },
    });

    return () => {
      // Hủy bỏ biểu đồ khi component bị unmount
      myChart.destroy();
    };
  }, [zingcharts]);

  return (
    <div className="w-[94%] m-auto bg-gradient-to-l to-[#391654] from-[#5D2680] h-[415px]">
      <div className="zingchart px-10">#zingchart</div>
      <div className="container_zingchart flex gap-12 h-full px-10">
        <div className="border w-[40%] h-[90%]">itemSong</div>
        <div className="zing_chart border flex-1 h-[90%]">
          {/* Sử dụng ref để liên kết với thẻ canvas */}
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Chart;
