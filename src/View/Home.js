import Card from "../Component/Card";
function HomePage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card to="/camera" title="Camera View" />
        <Card to="/viewdoc" title="View Document" />
      </div>
    </div>
  );
}
export default HomePage