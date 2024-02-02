import React, { FC, useState } from 'react'
import Vector from '../../types/Vector'
import './Calculator.module.css'

type NullableVector<T> = {
  [P in keyof T]: T[P] | undefined
}

interface CalcResult {
  evklid: number | undefined;
  manhetten: number| undefined;
  cheb: number| undefined;
}

const Calculator = () => {
  const [vector1, setVector1] = useState<NullableVector<Vector>>({ x: undefined, y: undefined, z: undefined})
  const [vector2, setVector2] = useState<NullableVector<Vector>>({ x: undefined, y: undefined, z: undefined})
  const [result, setResult] = useState<CalcResult>()

  function isVectorFilled (vector: NullableVector<Vector>): vector is Vector {
    return Object.values(vector).every(Boolean)
  }

  function calcEvklidResult () {
    if (!isVectorFilled(vector1) || !isVectorFilled(vector2)) return
    const expression = Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
    return Math.sqrt(expression)
  }

  function calcManhettenResult () {
    if (!isVectorFilled(vector1) || !isVectorFilled(vector2)) return
    const expression = Math.abs(vector1.x - vector2.x) + Math.abs(vector1.y - vector2.y) + Math.abs(vector1.z - vector2.z)
    return expression
  }

  function calcChebResult () {
    if (!isVectorFilled(vector1) || !isVectorFilled(vector2)) return
    const expression = [Math.abs(vector1.x - vector2.x), Math.abs(vector1.y - vector2.y), Math.abs(vector1.z - vector2.z)]
    return Math.max(...expression)
  }

  function calculateResult () {
    const evklidResult = calcEvklidResult()
    const manhettenResult = calcManhettenResult()
    const chebResult = calcChebResult()
    setResult({ evklid: evklidResult, manhetten: manhettenResult, cheb: chebResult })
  }

  function clearResult () {
    setVector1((prevVector) => ({ ...prevVector, x: undefined, y: undefined, z: undefined }))
    setVector2((prevVector) => ({ ...prevVector, x: undefined, y: undefined, z: undefined }))
    setResult((prevResult) => ({ ...prevResult, evklid: undefined, manhetten: undefined, cheb: undefined}))
    document.querySelector('table')?.querySelectorAll('input').forEach((input) => input.value = '')
  }

  function changeParam (value: string, property: 'x' | 'y' | 'z', vectorName: string) {
    const actualValue: number = parseInt(value)

    if (vectorName === 'vector1') {
      setVector1((prevVector) => ({
        ...prevVector,
        [property]: actualValue
      }))
    } else {
      setVector2((prevVector) => ({
        ...prevVector,
        [property]: actualValue
      }))
    }
  }

  return (
    <table>
    <tbody>
      <tr>
        <td colSpan={2}>
          Калькулятор метрик
        </td>
        <td colSpan={2}>
          розробив Калюжний Нікіта Андрійович
        </td>
      </tr>
      <tr>
        <td>V1</td>
        <td><input type="number" placeholder='x1' onChange={(e) => changeParam(e.target.value, 'x', 'vector1')} /></td>
        <td><input type="number" placeholder='y1' onChange={(e) => changeParam(e.target.value, 'y', 'vector1')} /></td>
        <td><input type="number" placeholder='z1' onChange={(e) => changeParam(e.target.value, 'z', 'vector1')} /></td>
      </tr>
      <tr>
        <td>V2</td>
        <td><input type="number" placeholder='x2' onChange={(e) => changeParam(e.target.value, 'x', 'vector2')} /></td>
        <td><input type="number" placeholder='y2' onChange={(e) => changeParam(e.target.value, 'y', 'vector2')} /></td>
        <td><input type="number" placeholder='z2' onChange={(e) => changeParam(e.target.value, 'z', 'vector2')} /></td>
      </tr>
      <tr>
        <td>Evklid</td>
        <td><b>{result?.evklid}</b></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>City</td>
        <td><b>{result?.manhetten}</b></td>
        <td></td>
        <td>
          <button onClick={calculateResult}>Обрахувати</button>
        </td>
      </tr>
      <tr>
        <td>Cheb</td>
        <td><b>{result?.cheb}</b></td>
        <td></td>
        <td>
          <button onClick={clearResult}>Очистити</button>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
  )
}

export default Calculator