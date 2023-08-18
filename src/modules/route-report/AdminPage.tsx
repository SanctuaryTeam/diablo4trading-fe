import React from 'react';
import { useParams } from 'react-router-dom'; // Use a routing library for navigation

const AdminPage: React.FC = () => {
  // Use a routing parameter to determine which section to display (moderators or administrators)
  const { section } = useParams<{ section: string }>();

  return (
    <div>
      <h1>Admin Page</h1>
      {section === 'moderators' && <ModeratorsSection />}
      {section === 'administrators' && <AdministratorsSection />}
    </div>
  );
};

export default AdminPage;
