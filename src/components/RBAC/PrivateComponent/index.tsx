const PrivateComponent = ({ children }: { children: React.ReactNode }) => {
  //Aca se debe validar el rol del usuario y si no tiene el rol, se debe mostrar el componente Unathorized
  return (
    <div>
      <h1>Private Component</h1>
    </div>
  );
};

export { PrivateComponent };
