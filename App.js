import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function App() {
  const [identificacion, setIdentificacion] = useState("");
  const [nombres, setNombres] = useState("");
  const [asignatura, setAsignaturas] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [nota3, setNota3] = useState("");
  const [definitiva, setDefinitiva] = useState("");
  const [observacion, setObservacion] = useState("");
  const [varnotas, setVarnotas] = useState([]);

  // Referencias a elementos
  let refidentificacion = useRef();
  const guardar = () => {
    //Agregar datos al array a través del método setdefinitiva para el array definitiva
    setVarnotas((varnotas) => [
      ...varnotas,
      {
        identificacion: identificacion,
        nombres: nombres,
        asignatura: asignatura,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        definitiva: definitiva,
        observacion: observacion,
      },
    ]);
    //console.log(definitiva);
    setIdentificacion("");
    setNombres("");
    setAsignaturas("");
    setNota1("");
    setNota2("");
    setNota3("");
    setDefinitiva("");
    setObservacion("");
    refidentificacion.current.focus();
  };

  const calcular = (definitiva) => {
    let notap = nota1 * 0.3 + nota2 * 0.35 + nota3 * 0.35;
    definitiva = notap;
    setDefinitiva(definitiva);
    console.log(notap);
    console.log(definitiva);

    if (definitiva >= 3) {
      setObservacion("APROBADO");
    } else if (definitiva == 2 && 2.94) {
      setObservacion("HABILITADO");
    } else {
      setObservacion("DESAPROBADO");
    }
  };

  const limpiar = () => {
    setVarnotas((varnotas) => [varnotas, {}]);
    setIdentificacion("");
    setNombres("");
    setAsignaturas("");
    setNota1("");
    setNota2("");
    setNota3("");
    setDefinitiva("");
    setObservacion("");
  };

  let buscar = (idenbuscar) => {
    let ident = varnotas.find(
      (notita) => notita.identificacion == identificacion
    );
    if (ident != undefined) {
      setNombres(ident.nombres);
      setAsignaturas(ident.asignatura);
      setNota1(ident.nota1);
      setNota2(ident.nota2);
      setNota3(ident.nota3);
      setDefinitiva(ident.definitiva);
      setObservacion(ident.observacion);
    } else {
      alert("Datos no encontrados ");
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          backgroundColor: "lightblue",
          fontSize: 30,
          margin: 40,
          fontFamily: "arial black",
        }}
      >
        SISTEMA DE NOTAS 🧮
      </Text>

      <View style={styles.body}>
        <Text>Identificación*: </Text>
        <TextInput
          //placeholder='Ingrese su identificación'
          style={{ borderBottom: "solid 1px" }}
          onChangeText={(identificacion) => setIdentificacion(identificacion)}
          value={identificacion}
          ref={refidentificacion}
          required={true}
        />
      </View>

      <View style={styles.body}>
        <Text>Nombres*: </Text>
        <TextInput
          //placeholder='Ingrese sus nombres'
          style={{ borderBottom: "solid 1px" }}
          onChangeText={(nombres) => setNombres(nombres)}
          value={nombres}
        />
      </View>

      <View style={styles.body}>
        <Text>Asignaturas*: </Text>
        <TextInput
          //placeholder='Ingrese la asignatura'
          style={{ borderBottom: "solid 1px" }}
          onChangeText={(asignatura) => setAsignaturas(asignatura)}
          value={asignatura}
        />
      </View>

      <View style={styles.body}>
        <Text>Nota 1*: </Text>
        <TextInput
          //placeholder='Ingrese la nota 1'
          style={{ borderBottom: "solid 1px" }}
          onChangeText={(nota1) => setNota1(nota1)}
          value={nota1}
        />
      </View>

      <View style={styles.body}>
        <Text>Nota 2*: </Text>
        <TextInput
          //placeholder='Ingrese la nota 2'
          style={{ borderBottom: "solid 1px" }}
          onChangeText={(nota2) => setNota2(nota2)}
          value={nota2}
        />
      </View>

      <View style={styles.body}>
        <Text>Nota 3*: </Text>
        <TextInput
          //placeholder='Ingrese la nota 3'
          style={{ borderBottom: "solid 1px" }}
          onChangeText={(nota3) => setNota3(nota3)}
          value={nota3}
        />
      </View>

      <View style={styles.body}>
        <Text>Definitiva: </Text>
        <TextInput
          //placeholder='Ingrese la nota 3'
          style={{ borderBottom: "solid 1px" }}
          onChangeText={(definitiva) => setDefinitiva(definitiva)}
          value={definitiva}
          editable={false}
        />
      </View>

      <View style={styles.body}>
        <Text>Observacion: </Text>
        <TextInput
          //placeholder='Ingrese la nota 3'
          style={{ borderBottom: "solid 1px" }}
          onChangeText={(observacion) => setObservacion(observacion)}
          value={observacion}
        />
      </View>

      {/* ESTOS SON LOS BOTONES */}

      <View style={styles.botones}>
        <TouchableOpacity onPress={guardar}>
          <Text style={styles.textboton}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={calcular}>
          <Text style={styles.textboton}>Calcular</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={buscar}>
          <Text style={styles.textboton}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={limpiar}>
          <Text style={styles.textboton}>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pinkligth",
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    flexDirection: "row",
    margin: 10,
  },

  botones: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    margin: 15,
    marginBottom: 20,
  },

  textboton: {
    color: "black",
    padding: 5,
    fontSize: 15,
    margin: 7,
    fontFamily: "arial black",
  },
});
