import React, { useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import { DnDProvider, useDrag, useDrop } from 'react-dnd';

const type = 'DragableCell';

const DragableCell = ({
  index, moveCell, className, style, ...restProps
}) => {
  const ref = useRef();
  const [{ isDrop, dropClassName }, drop] = useDrop(() => ({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem || {};
      if (index === dragIndex) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
      };
    },
    drop: (item) => {
      moveCell(item.index, index);
    },
  }),
  [index]);
  const [, drag] = useDrag(() => ({
    type,
    item: { index },
    collection: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }),
  [index]);
  drop(drag(ref));
  return (
    <td
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const columns = [
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year'
  },
  {
    title: 'Fall',
    dataIndex: '',
    key: 'year'
  },
  {
    title: 'Winter',
    dataIndex: 'winter',
    key: 'winter'
  },
  {
    title: 'Spring',
    dataIndex: 'spring',
    key: 'spring'
  },
  {
    title: 'Summer',
    dataIndex: 'summer',
    key: 'summer'
  }
];

const Plan2 = () => {
  const [data, setData] = useState([
    {
      key: '1',
      classes: ['class1', 'class2', 'class3']
    },
    {
      key: '2',
      classes: ['class1', 'class2', 'class3']
    },
    {
      key: '3',
      classes: ['class1', 'class2', 'class3']
    }
  ]);

  const components = {

  };
  const moveCell = useCallback((dragIndex, hoverIndex) => {
    const dragCell = data[dragIndex];
    setData(update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCell],
      ]
    }));
  },
  [data]);
  return (
    <div>
      <DnDProvider>
        <Table
          columns={columns}
          dataSource={data}
          components={components}
        />
      </DnDProvider>
    </div>
  );
};

export default Plan2;
