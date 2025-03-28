import React, { useEffect, useState } from 'react';
import './index.css';
import { useAuth } from '@context/AuthContext';
import Table from '@components/Table';
import Pagination from '@components/Pagination';
import { DataType, PaginatedOutput } from '../../types/data';
import { useAuthHttp } from '@hooks/useAuthHttp';

const Home: React.FC = () => {
  const fetchWithAuth = useAuthHttp();
  const [state, setState] = useState<PaginatedOutput<DataType>>({
    data: [],
    page: 1,
    take: 1,
    total: 0,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const auth = useAuth();

  const getData = () => {
    fetchWithAuth({
      url: `${process.env.BACKEND_URL}/api/data`,
      query: { page: currentPage, take: state.take },
    }).then((res) => {
      setState(res);
    });
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const data = await fetchWithAuth({
      url: `${process.env.BACKEND_URL}/api/data/upload`,
      input: {
        method: 'POST',
        body: formData,
      },
    });
    if (!data) {
      alert('Error!');
      return;
    }

    setCurrentPage((prev) => {
      if (prev === 1) {
        getData();
      }
      return 1;
    });
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <div className="home-page">
      <h2 className="home-page-title">TD TEST TASK</h2>
      <section className="home-page-content">
        {auth.user && (
          <div className="upload-container">
            <input
              type="file"
              accept=".csv"
              className="custom-file-input"
              onChange={(e) => {
                if (
                  e.target.files?.item(0) &&
                  confirm('Are yot want to upload file?')
                ) {
                  uploadFile(e.target.files.item(0)!);
                }
              }}
            />
          </div>
        )}
        {state.data.length ? (
          <>
            <Table
              heading={Object.keys(state.data[0].row ?? '')}
              rows={state.data.map((item) => item.row ?? {})}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={state.totalPages === 0 ? 1 : state.totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <p>List emty</p>
        )}
      </section>
    </div>
  );
};

export default Home;
