import { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { tulanganPlat } from "./data";
const Tulangan = (props) => {
  const [h, setH] = useState(0);
  // const [dc, setDc] = useState(0);
  const [selimut, setSelimut] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [faktor, setFaktor] = useState(0);
  const [b, setB] = useState(0);
  const [newTulangX, setNewTulangX] = useState({});
  const [newTulangY, setNewTulangY] = useState({});
  const [newTumpuanX, setNewTumpuanX] = useState({});
  const [newTumpuanY, setNewTumpuanY] = useState({});
  const [newSusut, setNewSusut] = useState({});
  const [dlx, setDlx] = useState(0);
  const [dly, setDly] = useState(0);
  const [dtx, setDtx] = useState(0);
  const [dty, setDty] = useState(0);
  const [mnlx, setMnlx] = useState(0);
  const [mnly, setMnly] = useState(0);
  const [mntx, setMntx] = useState(0);
  const [mnty, setMnty] = useState(0);
  const [persentLapX, setPersentLapX] = useState(0);
  const [persentLapY, setPersentLapY] = useState(0);
  const [persentTumpX, setPersentTumpX] = useState(0);
  const [persentTumpY, setPersentTumpY] = useState(0);
  const [testPLapX, setTestPLapX] = useState("");
  const [testPLapY, setTestPLapY] = useState("");
  const [testPTumX, setTestPTumX] = useState("");
  const [testPTumY, setTestPTumY] = useState("");
  const [testMnLapX, setTestMnLapX] = useState("");
  const [testMnLapY, setTestMnLapY] = useState("");
  const [testMnTumX, setTestMnTumX] = useState("");
  const [testMnTumY, setTestMnTumY] = useState("");
  const [kesLapX, setKesLapX] = useState("");
  const [kesLapY, setKesLapY] = useState("");
  const [kesTumX, setKesTumX] = useState("");
  const [kesTumY, setKesTumY] = useState("");
  let { m, newMlx, newMly, newMtx, newMty } = 0;
  const pmax = props.pmax;
  const pmin = props.pmin;
  const fy = props.fy;
  const fc = props.fc;
  const mlx = props.mlx;
  const mly = props.mly;
  const mtx = props.mtx;
  const mty = props.mty;
  // Operation
  newMlx = mlx / 100;
  newMly = mly / 100;
  newMtx = mtx / 100;
  newMty = mty / 100;
  m = fy / (0.85 * fc);
  let dc = h - selimut - 0.5 * diameter;

  // useEffect

  //Seacrh
  const seacrhDiameter = (item, key) => {
    for (let i = 0; i < item.length; i++) {
      if (item[i].diameter === key) {
        return i;
      }
    }
  };
  const seacrhSpasi = (item, diameter, value) => {
    const indexSpasi = seacrhDiameter(item, diameter);
    for (let i = 0; i < item[indexSpasi].index.length; i++) {
      if (item[indexSpasi].index[i].value > value) {
        return item[indexSpasi].index[i];
      }
    }
  };
  // Logic Nilai As
  const tulanganSusut = () => {
    const ass = 0.002 * b * h;
    const newValue = seacrhSpasi(tulanganPlat, diameter, ass.toFixed(1));
    return newValue;
  };
  const tulanganX = () => {
    const dlx = h - dc - diameter * 0.5;
    setDlx(dlx);
    const mnlx = newMlx / faktor;
    setMnlx(mnlx);
    const rn = (mnlx.toFixed(1) * 1000) / (b * dlx * dlx);
    const temP = 1 - (2 * m * rn.toFixed(7)) / fy;
    const p = (1 / m) * (1 - Math.sqrt(temP));
    let as = 0;
    if (p.toFixed(4) < pmin) {
      as = pmin * b * dlx;
    } else if (p.toFixed(4) > pmax) {
      as = pmax * b * dlx;
    } else {
      as = p.toFixed(4) * b * dlx;
    }
    const newValue = seacrhSpasi(tulanganPlat, diameter, as.toFixed(1));
    return newValue;
  };
  const tulanganY = () => {
    const dly = h - dc - diameter - diameter * 0.5;
    setDly(dly);
    const mnly = newMly / faktor;
    setMnly(mnly);
    const rn = (mnly.toFixed(1) * 1000) / (b * dly * dly);
    const temP = 1 - (2 * m * rn.toFixed(7)) / fy;
    const p = (1 / m) * (1 - Math.sqrt(temP));
    let as = 0;
    if (p.toFixed(4) < pmin) {
      as = pmin * b * dly;
    } else if (p.toFixed(4) > pmax) {
      as = pmax * b * dly;
    } else {
      as = p.toFixed(4) * b * dly;
    }
    const newValue = seacrhSpasi(tulanganPlat, diameter, as.toFixed(1));
    return newValue;
  };
  const tumpuanX = () => {
    const dtx = h - dc - diameter - diameter * 0.5;
    setDtx(dtx);
    const mntx = newMtx / faktor;
    setMntx(mntx);
    const rn = (mntx.toFixed(1) * 1000) / (b * dtx * dtx);
    const temP = 1 - (2 * m * rn.toFixed(7)) / fy;
    const p = (1 / m) * (1 - Math.sqrt(temP));
    let as = 0;
    if (p.toFixed(4) < pmin) {
      as = pmin * b * dtx;
    } else if (p.toFixed(4) > pmax) {
      as = pmax * b * dtx;
    } else {
      as = p.toFixed(4) * b * dtx;
    }
    const newValue = seacrhSpasi(tulanganPlat, diameter, as.toFixed(1));
    return newValue;
  };
  const tumpuanY = () => {
    const dty = h - dc - diameter - diameter * 0.5;
    setDty(dty);
    const mnty = newMty / faktor;
    setMnty(mnty);
    const rn = (mnty.toFixed(1) * 1000) / (b * dty * dty);
    const temP = 1 - (2 * m * rn.toFixed(7)) / fy;
    const p = (1 / m) * (1 - Math.sqrt(temP));
    let as = 0;
    if (p.toFixed(4) < pmin) {
      as = pmin * b * dty;
    } else if (p.toFixed(4) > pmax) {
      as = pmax * b * dty;
    } else {
      as = p.toFixed(4) * b * dty;
    }
    const newValue = seacrhSpasi(tulanganPlat, diameter, as.toFixed(1));
    return newValue;
  };

  //Logic Testing
  const testTahananP = (as, b, d) => {
    const p = as / (b * d);
    return p;
  };

  const testTahananMn = (as, fy, fc, b, d) => {
    const a = (as * fy) / (0.85 * fc * b);
    const mn = as * fy * (d - a / 2);
    return mn.toFixed(2);
  };

  const testLapX = (as, b, d, fy, fc) => {
    const p = testTahananP(as, b, d);
    p > pmin && p < pmax ? setTestPLapX("OK") : setTestPLapX("FAIL");
    const mn = testTahananMn(as, fy, fc, b, d);
    mn > mnlx * 1000000 ? setTestMnLapX("OK") : setTestMnLapX("FAIL");
    return mn;
  };
  const testLapY = (as, b, d, fy, fc) => {
    const p = testTahananP(as, b, d);
    p > pmin && p < pmax ? setTestPLapY("OK") : setTestPLapY("FAIL");
    const mn = testTahananMn(as, fy, fc, b, d);
    mn > mnly * 1000000 ? setTestMnLapY("OK") : setTestMnLapY("FAIL");
    return mn;
  };
  const testTumX = (as, b, d, fy, fc) => {
    const p = testTahananP(as, b, d);
    p > pmin && p < pmax ? setTestPTumX("OK") : setTestPTumX("FAIL");
    const mn = testTahananMn(as, fy, fc, b, d);
    mn > mntx * 1000000 ? setTestMnTumX("OK") : setTestMnTumX("FAIL");
    return mn;
  };
  const testTumY = (as, b, d, fy, fc) => {
    const p = testTahananP(as, b, d);
    p > pmin && p < pmax ? setTestPTumY("OK") : setTestPTumY("FAIL");
    const mn = testTahananMn(as, fy, fc, b, d);
    mn > mnty * 1000000 ? setTestMnTumY("OK") : setTestMnTumY("FAIL");
    return mn;
  };

  const kesimpulan = () => {
    testPLapX === "OK" && testMnLapX === "OK"
      ? setKesLapX("dipakai")
      : setKesLapX("tidak memenuhi syarat");
    testPLapY === "OK" && testMnLapY === "OK"
      ? setKesLapY("dipakai")
      : setKesLapY("tidak memenuhi syarat");
    testPTumX === "OK" && testMnTumX === "OK"
      ? setKesTumX("dipakai")
      : setKesTumX("tidak memenuhi syarat");
    testPTumY === "OK" && testMnTumY === "OK"
      ? setKesTumY("dipakai")
      : setKesTumY("tidak memenuhi syarat");
  };
  //Event Click
  const resultTulangan = () => {
    if (h && dc && diameter && faktor && b !== 0) {
      if (
        diameter === 8 ||
        diameter === 10 ||
        diameter === 12 ||
        diameter === 13 ||
        diameter === 16 ||
        diameter === 19 ||
        diameter === 22 ||
        diameter === 25 ||
        diameter === 29
      ) {
        const tempTulX = tulanganX();
        const tempTulY = tulanganY();
        const tempTumX = tumpuanX();
        const tempTumY = tumpuanY();
        const tempSusut = tulanganSusut();
        setNewTulangX(tempTulX);
        setNewTulangY(tempTulY);
        setNewTumpuanX(tempTumX);
        setNewTumpuanY(tempTumY);
        setNewSusut(tempSusut);
      } else {
        alert(
          "Pilih Diameter 8mm, 10mm, 12mm, 13mm, 16mm, 19mm, 22mm, 25mm atau 29mm"
        );
      }
    } else {
      alert("Silahkan Isi Semua Nilai");
    }
  };
  const testing = () => {
    const tempMnLapX = testLapX(newTulangX.value, b, dlx, fy, fc);
    const tempMnLapY = testLapY(newTulangY.value, b, dly, fy, fc);
    const tempMnTumX = testTumX(newTumpuanX.value, b, dtx, fy, fc);
    const tempMnTumY = testTumY(newTumpuanY.value, b, dty, fy, fc);
    const tempPersentLapX = (tempMnLapX / (mnlx * 1000000)) * 100;
    const tempPersentLapY = (tempMnLapY / (mnly * 1000000)) * 100;
    const tempPersentTumX = (tempMnTumX / (-mntx * 1000000)) * 100;
    const tempPersentTumY = (tempMnTumY / (-mnty * 1000000)) * 100;
    setPersentLapX(tempPersentLapX.toFixed(1));
    setPersentLapY(tempPersentLapY.toFixed(1));
    setPersentTumpX(tempPersentTumX.toFixed(1));
    setPersentTumpY(tempPersentTumY.toFixed(1));
  };
  return (
    <>
      <Container>
        <h2 className="text-center">Perhitungan Tulangan</h2>
        <Table>
          <tbody>
            <tr>
              <td>Tebal Plat (h)</td>
              <td>
                <input onChange={(e) => setH(parseFloat(e.target.value))} />
              </td>
              <td>mm</td>
            </tr>
            <tr>
              <td>Tebal Selimut Beton (s)</td>
              <td>
                <input
                  onChange={(e) => setSelimut(parseFloat(e.target.value))}
                />
              </td>
              <td>mm</td>
            </tr>

            <tr>
              <td>Diameter Tulangan (Ø)</td>
              <td>
                <input
                  onChange={(e) => setDiameter(parseFloat(e.target.value))}
                />
              </td>
              <td>mm</td>
            </tr>
            <tr>
              <td>Jarak Tepi Plat ke Tulangan (dc)</td>
              <td>{dc} </td>
              <td>mm</td>
            </tr>
            <tr>
              <td>Faktor Reduksi (Փ)</td>
              <td>
                <input
                  onChange={(e) => setFaktor(parseFloat(e.target.value))}
                />
              </td>
            </tr>
            <tr>
              <td>Lebar Plat (b)</td>
              <td>
                <input onChange={(e) => setB(parseFloat(e.target.value))} />
              </td>
              <td>mm</td>
            </tr>
            <tr>
              <td>Momen Lapngan Arah X (Mlx)</td>
              <td>{mlx}</td>
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Momen Lapngan Arah Y (Mly)</td>
              <td>{mly}</td>
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Momen Tumpuan Arah X (Mtx)</td>
              {mtx === -Infinity ? <td>-</td> : <td>{mtx}</td>}
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Momen Tumpuan Arah Y (Mty)</td>
              {mty === -Infinity ? <td>-</td> : <td>{mty}</td>}
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Mutu Baja (fy) </td>
              <td>{fy} </td>
              <td>MPa</td>
            </tr>
            <tr>
              <td>Mutu Beton (fc)</td>
              <td>{fc} </td>
              <td>MPa</td>
            </tr>
            <tr>
              <td>
                Perbandingan Luas Baja / Luas Beton Minimal (ρ <sub>min</sub>)
              </td>
              <td>{pmin}</td>
            </tr>
            <tr>
              <td>
                Perbandingan Luas Baja / Luas Beton Maximal (ρ <sub>max</sub>)
              </td>
              <td>{pmax} </td>
            </tr>
            <tr className="text-center">
              <td colSpan={3}>
                <Button onClick={() => resultTulangan()}>
                  Hitung Tulangan
                </Button>
              </td>
            </tr>
            <tr>
              <td>Tulangan Lapangan X yang dibutuhkan</td>
              <td>
                Ø{diameter}-{newTulangX.spasi} ({newTulangX.value} mm
                <sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td>Tulangan Lapangan Y yang dibutuhkan</td>
              <td>
                Ø{diameter}-{newTulangY.spasi} ({newTulangY.value} mm
                <sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td>Tulangan Tumpuan X yang dibutuhkan</td>
              <td>
                Ø{diameter}-{newTumpuanX.spasi} ({newTumpuanX.value} mm
                <sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td>Tulangan Tumpuan Y yang dibutuhkan</td>
              <td>
                Ø{diameter}-{newTumpuanY.spasi} ({newTumpuanY.value} mm
                <sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td>Tulangan Susut yang dibutuhkan</td>
              <td>
                Ø{diameter}-{newSusut.spasi} ({newSusut.value} mm<sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td className="text-center" colSpan={3}>
                <Button onClick={() => testing()}>Jalankan Test</Button>
              </td>
            </tr>
            <tr>
              <td className="text-center" colSpan={3}>
                Tulangan Lapangan Arah X
              </td>
            </tr>
            <tr>
              <td>Perbandingan Luas Baja dan Luas Beton (ρ)</td>
              {testPLapX === "OK" ? (
                <td>{testPLapX}</td>
              ) : (
                <td className="red-text">{testPLapX}</td>
              )}
            </tr>
            <tr>
              <td>Momen Nominal (Mn)</td>
              {testMnLapX === "OK" ? (
                <td>
                  {testMnLapX} ({persentLapX}%)
                </td>
              ) : (
                <td className="red-text">
                  {testMnLapX} ({persentLapX}%)
                </td>
              )}
            </tr>
            <tr>
              <td className="text-center" colSpan={3}>
                Tulangan Lapangan Arah Y
              </td>
            </tr>
            <tr>
              <td>Perbandingan Luas Baja dan Luas Beton (ρ)</td>
              {testPLapY === "OK" ? (
                <td>{testPLapY}</td>
              ) : (
                <td className="red-text">{testPLapY}</td>
              )}
            </tr>
            <tr>
              <td>Momen Nominal (Mn)</td>
              {testMnLapY === "OK" ? (
                <td>
                  {testMnLapY} ({persentLapY}%)
                </td>
              ) : (
                <td className="red-text">
                  {testMnLapY} ({persentLapY}%)
                </td>
              )}
            </tr>
            <tr>
              <td className="text-center" colSpan={3}>
                Tulangan Tumpuan Arah X
              </td>
            </tr>
            <tr>
              <td>Perbandingan Luas Baja dan Luas Beton (ρ)</td>
              {testPTumX === "OK" ? (
                <td>{testPTumX}</td>
              ) : (
                <td className="red-text">{testPTumX}</td>
              )}
            </tr>
            <tr>
              <td>Momen Nominal (Mn)</td>
              {testMnTumX === "OK" ? (
                <td>
                  {testMnTumX} ({persentTumpX}%)
                </td>
              ) : (
                <td className="red-text">
                  {testMnTumX} ({persentTumpX}%)
                </td>
              )}
            </tr>
            <tr>
              <td className="text-center" colSpan={3}>
                Tulangan Tumpuan Arah Y
              </td>
            </tr>
            <tr>
              <td>Perbandingan Luas Baja dan Luas Beton (ρ)</td>
              {testPTumY === "OK" ? (
                <td>{testPTumY}</td>
              ) : (
                <td className="red-text">{testPTumY}</td>
              )}
            </tr>
            <tr>
              <td>Momen Nominal (Mn)</td>
              {testMnTumY === "OK" ? (
                <td>
                  {testMnTumY} ({persentTumpY}%)
                </td>
              ) : (
                <td className="red-text">
                  {testMnTumY} ({persentTumpY}%)
                </td>
              )}
            </tr>
            <tr>
              <td className="text-center" colSpan={3}>
                <Button onClick={() => kesimpulan()}>Kesimpulan</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <h2 className="text-center">Kesimpulan</h2>
        <Table>
          <tbody>
            <tr>
              <td>Tulangan Lapangan X yang {kesLapX}</td>
              <td>
                Ø{diameter}-{newTulangX.spasi} ({newTulangX.value} mm
                <sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td>Tulangan Lapangan Y yang {kesLapY}</td>
              <td>
                Ø{diameter}-{newTulangY.spasi} ({newTulangY.value} mm
                <sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td>Tulangan Tumpuan X yang {kesTumX}</td>
              <td>
                Ø{diameter}-{newTumpuanX.spasi} ({newTumpuanX.value} mm
                <sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td>Tulangan Tumpuan Y yang {kesTumY}</td>
              <td>
                Ø{diameter}-{newTumpuanY.spasi} ({newTumpuanY.value} mm
                <sup>2</sup>)
              </td>
            </tr>
            <tr>
              <td>Tulangan Susut yang dipakai</td>
              <td>
                Ø{diameter}-{newSusut.spasi} ({newSusut.value} mm<sup>2</sup>)
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default Tulangan;
