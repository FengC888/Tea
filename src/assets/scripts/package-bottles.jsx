function PackageBottles() {
  const [bottles, setBottles] = React.useState();

  React.useEffect(() => {
    const url = window.location.pathname.replace('/+', 'https://app.tea.xyz/api/bottles/');
    fetch(url)
      .then((res) => res.json())
      .then((res) => setBottles(res));
  }, []);

  if (!bottles) return null;

  const names = [...new Set(bottles.map((b) => b.name))];

  return (
    <div>
      {names.map((name) => (
        <Bottle key={name} name={name} />
      ))}
    </div>
  );

  function Bottle({ name }) {
    const [expanded, toggleExpanded] = React.useState(false);
    const versions = [
      ...new Set(bottles.map((b) => b.version)),
    ];
    return (
      <div className="expand" onClick={() => toggleExpanded(!expanded)}>
        <div className="expand-text one-box-down">
          <h4 className="display-6">
            {versions.length} version{versions.length === 1 ? "" : "s"} bottled
          </h4>
        </div>
        <table className="one-box-down">
          <thead>
            <tr>
              <th>version</th>
              <th>darwin-aarch64</th>
              <th>darwin-x86-64</th>
              <th>linux-aarch64</th>
              <th>linux-x86-64</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((v) => {
              const available = new Set(
                bottles
                  .filter((b) => b.name === name && b.version == v)
                  .map((b) => `${b.platform}-${b.arch}`)
              );
              return (
                <tr key={v}>
                  <th>{v}</th>
                  <td>{available.has("darwin-aarch64") ? "✅" : "❌"}</td>
                  <td>{available.has("darwin-x86-64") ? "✅" : "❌"}</td>
                  <td>{available.has("linux-aarch64") ? "✅" : "❌"}</td>
                  <td>{available.has("linux-x86-64") ? "✅" : "❌"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
ReactDOM.render(React.createElement(PackageBottles), document.getElementById("packageApp"));
