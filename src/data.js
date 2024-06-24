// src/data.js
export const tables = [
    {
      id: '1',
      name: 'employee_salary',
      columns: [
        { column_id: '1', name: 'age', column_data_type: 'INTEGER' },
        { column_id: '2', name: 'emp_id', column_data_type: 'INTEGER' },
        { column_id: '3', name: 'experience', column_data_type: 'INTEGER' },
      ],
    },
    {
      id: '2',
      name: 'employee',
      columns: [
        { column_id: '4', name: 'department_id', column_data_type: 'INTEGER' },
        { column_id: '5', name: 'email', column_data_type: 'STRING' },
        { column_id: '6', name: 'employee_id', column_data_type: 'INTEGER' },
      ],
    },
    {
        id: '3',
        name: 'patients',
        columns: [
          { column_id: '7', name: 'date_of_birth', column_data_type: 'DATE', },
          { column_id: '8', name: 'first_name', column_data_type: 'VARCHAR', column_size: 20 },
          { column_id: '9', name: 'gender', column_data_type: 'VARCHAR', column_size: 10  },
        ],
      },
      {
        id: '4',
        name: 'patients_info',
        columns: [
          { column_id: '10', name: 'admission_date', column_data_type: 'DATE', },
          { column_id: '11', name: 'city', column_data_type: 'VARCHAR', column_size: 20 },
          { column_id: '12', name: 'state', column_data_type: 'VARCHAR', column_size: 10  },
        ],
      },
      {
        id: '5',
        name: 'doctors',
        columns: [
            { column_id: '13', name: 'first_name', column_data_type: 'VARCHAR', column_size: 20 },
            { column_id: '13', name: 'last_name', column_data_type: 'VARCHAR', column_size: 20 },
            { column_id: '10', name: 'registration_date', column_data_type: 'DATE', },
          ],
        }
  ];
  