
const PageHeader = ({ title, subtitle, mt="20px"}) => {
  return (
    <div style={{marginTop: mt}}>
      <h1 style={{fontSize:'20px', marginBottom:"8px"}}>{title}</h1>
      <p style={{fontSize:"14px", marginBottom:"10px"}}>{subtitle}</p>
    </div>
  )
}
export default PageHeader