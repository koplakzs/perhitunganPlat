import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { twoWaysSlab } from "./data";
import Tulangan from "./Tulangan";
const Momen = (props) => {
  const [ly, setLy] = useState(0);
  const [lx, setLx] = useState(0);
  const [type, setType] = useState();
  const [keyPlat, setKeyPlat] = useState([]);
  const [maxMlx, setMaxMlx] = useState([]);
  const [maxMly, setMaxMly] = useState([]);
  const [maxMtx, setMaxMtx] = useState([]);
  const [maxMty, setMaxMty] = useState([]);
  let { mlx, mly, mtx, mty, indexImg, tempKeyPlat } = 0;
  let newMaxMlx = Math.max(...maxMlx);
  let newMaxMly = Math.max(...maxMly);
  let newMaxMtx = Math.max(...maxMtx);
  let newMaxMty = Math.max(...maxMty);
  let q = props.q;

  //Boolean
  const [show, setShow] = useState(false);
  useEffect(() => {
    keyPlat.length !== 0 ? setShow(true) : setShow(false);
  }, [keyPlat]);
  // Linear Seacrh
  const linearSearch = (item, key) => {
    for (let i = 0; i < item.length; i++) {
      if (item[i].type === key) {
        return i;
      }
    }
  };
  // find mlx, mly, mtx, mty
  const newMlx = (twoWaysSlab, keyplat, index) => {
    const newKeyplat = parseFloat(keyplat.toFixed(1));
    for (let i = 0; i < twoWaysSlab[index].mlx.length; i++) {
      if (twoWaysSlab[index].mly[i].key === newKeyplat) {
        return twoWaysSlab[index].mlx[i].value;
      }
    }
  };
  const newMly = (twoWaysSlab, keyplat, index) => {
    const newKeyplat = parseFloat(keyplat.toFixed(1));
    for (let i = 0; i < twoWaysSlab[index].mly.length; i++) {
      if (twoWaysSlab[index].mly[i].key === newKeyplat) {
        return twoWaysSlab[index].mly[i].value;
      }
    }
  };
  const newMtx = (twoWaysSlab, keyplat, index) => {
    const newKeyplat = parseFloat(keyplat.toFixed(1));
    for (let i = 0; i < twoWaysSlab[index].mtx.length; i++) {
      if (twoWaysSlab[index].mly[i].key === newKeyplat) {
        return twoWaysSlab[index].mtx[i].value;
      }
    }
  };
  const newMty = (twoWaysSlab, keyplat, index) => {
    const newKeyplat = parseFloat(keyplat.toFixed(1));
    for (let i = 0; i < twoWaysSlab[index].mty.length; i++) {
      if (twoWaysSlab[index].mly[i].key === newKeyplat) {
        return twoWaysSlab[index].mty[i].value;
      }
    }
  };
  // Logic

  const hitungMoment = (twoWaysSlab, type, keyPlat) => {
    indexImg = linearSearch(twoWaysSlab, type);
    const dumbMlx = newMlx(twoWaysSlab, keyPlat, indexImg);
    const dumbMly = newMly(twoWaysSlab, keyPlat, indexImg);
    mlx = (0.001 * q * lx * lx * dumbMlx).toFixed(2);
    mly = (0.001 * q * lx * lx * dumbMly).toFixed(2);
    if (type === "Type IVA" || type === "Type VA") {
      const dumbMty = newMty(twoWaysSlab, keyPlat, indexImg);
      mty = (-0.001 * q * lx * lx * dumbMty).toFixed(2);
      mtx = 0;
    } else if (type === "Type IVB" || type === "Type VB") {
      const dumbMtx = newMtx(twoWaysSlab, keyPlat, indexImg);
      mtx = (-0.001 * q * lx * lx * dumbMtx).toFixed(2);
      mty = 0;
    } else if (
      type === "Type II" ||
      type === "Type III" ||
      type === "Type VIA" ||
      type === "Type VIB"
    ) {
      const dumbMtx = newMtx(twoWaysSlab, keyPlat, indexImg);
      const dumbMty = newMty(twoWaysSlab, keyPlat, indexImg);
      mtx = (-0.001 * q * lx * lx * dumbMtx).toFixed(2);
      mty = (-0.001 * q * lx * lx * dumbMty).toFixed(2);
    } else if (type === "Type I") {
      mtx = 0;
      mty = 0;
    }
    setMaxMlx([...maxMlx, mlx]);
    setMaxMly([...maxMly, mly]);
    if (mtx !== 0) {
      setMaxMtx([...maxMtx, mtx]);
    }
    if (mty !== 0) {
      setMaxMty([...maxMty, mty]);
    }
  };
  const resultMomen = () => {
    if (ly && lx !== 0) {
      if (ly >= lx) {
        tempKeyPlat = ly / lx;
        if (tempKeyPlat > 2.5) {
          tempKeyPlat = 2.6;
          hitungMoment(twoWaysSlab, type, tempKeyPlat);
        } else {
          hitungMoment(twoWaysSlab, type, tempKeyPlat);
        }
        setKeyPlat([
          ...keyPlat,
          {
            src: twoWaysSlab[indexImg].src,
            sizeLy: ly,
            sizeLx: lx,
            lylx: tempKeyPlat.toFixed(1),
            valueMlx: mlx,
            valueMly: mly,
            valueMtx: mtx,
            valueMty: mty,
          },
        ]);
      } else {
        alert("Nilai Ly Harus Lebih Besar Dari Lx");
      }
    } else {
      alert("Silahkan Isi Semua Nilai");
    }
  };
  return (
    <Container>
      <h2 className="text-center">Perhitungan Momen Plat Atap</h2>
      <Table>
        <tbody>
          <tr>
            <td>Panjang Plat Arah Y (Ly)</td>
            <td>
              <input onChange={(e) => setLy(parseFloat(e.target.value))} />
            </td>
            <td>m</td>
          </tr>
          <tr>
            <td>Panjang Plat Arah X (Lx)</td>
            <td>
              <input onChange={(e) => setLx(parseFloat(e.target.value))} />
            </td>
            <td>m</td>
          </tr>
          <tr>
            <td>Beban Ultimit Terbesar (q)</td>
            <td>{q}</td>
            <td>
              Kg/m<sup>2</sup>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="text-center">
              Pilih Jenis Perletakan
            </td>
          </tr>

          {twoWaysSlab.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="radio"
                    name="choose-type"
                    value={item.type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </td>
                <td>
                  <label>
                    <img className="platImage" src={item.src} alt={item.type} />
                  </label>
                </td>
              </tr>
            );
          })}

          <tr className="text-center">
            <td colSpan={3}>
              <Button onClick={() => resultMomen()}>Hitung Moment</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Table>
        <tbody>
          {keyPlat.length !== 0 ? (
            <tr>
              <td>Gambar</td>
              <td>Size</td>
              <td>Ly / Lx</td>
              <td>
                q (Kg/m<sup>2</sup>)
              </td>
              <td>
                Mlx (Kg/m<sup>2</sup>)
              </td>
              <td>
                Mly (Kg/m<sup>2</sup>)
              </td>
              <td>
                Mtx (Kg/m<sup>2</sup>)
              </td>
              <td>
                Mty (Kg/m<sup>2</sup>)
              </td>
            </tr>
          ) : (
            ""
          )}

          {keyPlat.map((keyplat, index) => {
            return (
              <tr key={index}>
                <td>
                  <img className="platImage" src={keyplat.src} alt="pic" />
                </td>
                <td>
                  {keyplat.sizeLy}m x {keyplat.sizeLx}m
                </td>
                <td>{keyplat.lylx}</td>
                <td>{q}</td>
                <td>{keyplat.valueMlx} </td>
                <td>{keyplat.valueMly}</td>
                <td>{keyplat.valueMtx}</td>
                <td>{keyplat.valueMty}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {show ? (
        <Tulangan
          pmax={props.pmax}
          pmin={props.pmin}
          fy={props.fy}
          fc={props.fc}
          mlx={newMaxMlx}
          mly={newMaxMly}
          mtx={newMaxMtx}
          mty={newMaxMty}
        />
      ) : (
        ""
      )}
    </Container>
  );
};
export default Momen;
