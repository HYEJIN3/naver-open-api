import React, { useState } from 'react';
import { PostSearchTrend } from '../apis/main';
import { Input, DatePicker, Select, Button } from 'antd';
import * as Style from '../styles/main.styled';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

function Main() {
  const dateFormat = 'YYYY-MM-DD';
  let chartWidth = window.innerWidth;
  interface Data {
    startDate: string;
    endDate: string;
    timeUnit: string;
    category: string;
    keyword: string;
    device: string;
    gender: string;
    ages: any;
  }

  const [data, setData] = useState<Data>({
    startDate: '',
    endDate: '',
    timeUnit: '',
    category: '',
    keyword: '',
    device: '',
    gender: '',
    ages: [],
  });

  const [chartData, setChartData] = useState<any[]>([]);

  const monthData = [
    {
      value: 'date',
      label: 'date',
    },
    {
      value: 'week',
      label: 'week',
    },
    {
      value: 'month',
      label: 'month',
    },
  ];

  const ageData = [
    {
      value: '10',
      label: '10',
    },
    {
      value: '20',
      label: '20',
    },
    {
      value: '30',
      label: '30',
    },
    {
      value: '40',
      label: '40',
    },
    {
      value: '50',
      label: '50',
    },
    {
      value: '60',
      label: '60',
    },
  ];

  const genderData = [
    {
      value: 'm',
      label: 'm',
    },
    {
      value: 'f',
      label: 'f',
    },
  ];

  const deviceData = [
    {
      value: 'pc',
      label: 'pc',
    },
    {
      value: 'mo',
      label: 'mo',
    },
  ];

  function onChangeStartDate(event: any, date: string) {
    setData({
      ...data,
      startDate: date,
    });
  }

  function onChangeEndDate(event: any, date: string) {
    setData({
      ...data,
      endDate: date,
    });
  }

  function onChangeCategory(event: any) {
    setData({
      ...data,
      category: event.target.value,
    });
  }

  function onChangeKeyword(event: any) {
    setData({
      ...data,
      keyword: event.target.value,
    });
  }

  function onChangeMonth(event: any) {
    setData({
      ...data,
      timeUnit: event,
    });
  }

  function onChangeAge(event: any) {
    let agesArray = [];
    agesArray = event;
    setData({
      ...data,
      ages: agesArray,
    });
  }

  function onChangeGender(event: any) {
    setData({
      ...data,
      gender: event,
    });
  }

  function onChangeDevice(event: any) {
    setData({
      ...data,
      device: event,
    });
  }

  async function onClickSearchBtn() {
    try {
      if (
        data.startDate === '' ||
        data.endDate === '' ||
        data.timeUnit === '' ||
        data.category === '' ||
        data.keyword === ''
      ) {
        alert('필수값을 입력해주세요.');
        return;
      }
      const result = await PostSearchTrend(data);
      if (result.status === 200) {
        drawGraph(result.data.results[0].data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function drawGraph(data: any) {
    let processingData: any = [];

    const sortChart = data.reduce((acc: any, current: any) => {
      acc[current.period] = acc[current.period] || [];
      acc[current.period].push({ [current.group]: current.ratio });
      return acc;
    }, {});
    processingData = Object.keys(sortChart).map(key => {
      return {
        name: key,
        ...sortChart[key][0],
        ...sortChart[key][1],
        ...sortChart[key][2],
        ...sortChart[key][3],
        ...sortChart[key][4],
        ...sortChart[key][5],
        ...sortChart[key][6],
      };
    });
    setChartData(processingData);
  }

  return (
    <div>
      <Style.SearchContainer>
        <Style.SearchDataRowContainer>
          <Style.InputDateContainer>
            <Style.SearchDataText>시작일자:</Style.SearchDataText>
            <DatePicker format={dateFormat} onChange={onChangeStartDate} />
          </Style.InputDateContainer>
          <Style.InputDateContainer>
            <Style.SearchDataText>종료일자:</Style.SearchDataText>
            <DatePicker format={dateFormat} onChange={onChangeEndDate} />
          </Style.InputDateContainer>
          <Style.InputDateContainer>
            <Style.SearchDataText>카테고리:</Style.SearchDataText>
            <Input placeholder="category" onChange={onChangeCategory} />
          </Style.InputDateContainer>
          <Style.InputDateContainer>
            <Style.SearchDataText>키워드:</Style.SearchDataText>
            <Input placeholder="keyword" onChange={onChangeKeyword} />
          </Style.InputDateContainer>
        </Style.SearchDataRowContainer>
        <Style.SearchDataRowContainer>
          <Select
            bordered={false}
            placeholder="month"
            options={monthData}
            onChange={onChangeMonth}
          ></Select>
          <Select
            mode="multiple"
            style={{ width: 150 }}
            bordered={false}
            placeholder="age"
            options={ageData}
            onChange={onChangeAge}
          ></Select>
          <Select
            style={{ width: 150 }}
            bordered={false}
            placeholder="gender"
            options={genderData}
            onChange={onChangeGender}
          ></Select>
          <Select
            style={{ width: 150 }}
            bordered={false}
            placeholder="device"
            options={deviceData}
            onChange={onChangeDevice}
          ></Select>
        </Style.SearchDataRowContainer>
        <Button type="primary" onClick={onClickSearchBtn}>
          조회
        </Button>
      </Style.SearchContainer>
      <Style.ChartContainer>
        <LineChart
          width={chartWidth}
          height={500}
          data={chartData}
          margin={{ top: 20, right: 30, bottom: 5, left: 20 }}
        >
          <Line type="monotone" dataKey="10" stroke="#8884d8" />
          <Line type="monotone" dataKey="20" stroke="#ff0000" />
          <Line type="monotone" dataKey="30" stroke="#999900" />
          <Line type="monotone" dataKey="40" stroke="#00994c" />
          <Line type="monotone" dataKey="50" stroke="#0080ff" />
          <Line type="monotone" dataKey="60" stroke="#7f00ff" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </Style.ChartContainer>
    </div>
  );
}

export default Main;
