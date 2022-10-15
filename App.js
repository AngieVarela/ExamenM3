import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useForm, Controller } from 'react-hook-form';


export default function App() {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { identificacion: '', nombres: '', asignatura: '', nota1: '', nota2: '', nota3: '' }
  })

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
  const onSubmit = () => {
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
    } else if (definitiva >= 2 && 2.94) {
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

        <Controller control={control}
          rules={{
            required: true, pattern: /^[0-9]+$/g, maxLength: 10, minLength: 5
          }}

          render={({ field: { onChange, onBlur, identificacion } }) => (
            <TextInput
              style={[styles.inpust, {
                borderColor: errors.identificacion?.type == "required" || errors.identificacion?.type == "pattern" || errors.identificacion?.type
                  == "maxLength" || errors.identificacion?.type == "minLength" ? 'red' : 'lightblue'
              }]}
              onChangeText={(identificacion) => setIdentificacion(identificacion)}
              onChange={onChange}
              onBlur={onBlur}
              value={identificacion}
              ref={refidentificacion}
            />

          )}
          name="identificacion"
        />
        {errors.identificacion?.type == "required" && <Text style={{ color: 'red' }}> La Identificacion es obligatoria</Text>}
        {errors.identificacion?.type == "maxLength" && <Text style={{ color: 'red' }}> La Identificacion no puede exceder 10 caracteres</Text>}
        {errors.identificacion?.type == "minLength" && <Text style={{ color: 'red' }}> La Identificacion es minimo de 5 caracteres</Text>}
        {errors.identificacion?.type == "pattern" && <Text style={{ color: 'red' }}> La Identificacion solo debe ser con Numeros</Text>}
      </View>

      <View style={styles.body}>
        <Text>Nombres*: </Text>
        <Controller control={control}
          rules={{
            required: true, pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g, maxLength: 30, minLength: 3
          }}

          render={({ field: { onChange, onBlur, nombres } }) => (

            <TextInput
              style={[styles.inpust, {
                borderColor: errors.nombres?.type == "required" || errors.nombres?.type == "pattern" || errors.nombres?.type
                  == "maxLength" || errors.nombres?.type == "minLength" ? 'red' : 'lightblue'
              }]}

              onChangeText={(nombres) => setNombres(nombres)}
              onChange={onChange}
              onBlur={onBlur}
              value={nombres}
            />
          )}
          name="nombres"

        />
        {errors.nombres?.type == "required" && <Text style={{ color: 'red' }}> El nombre es obligatorio</Text>}
        {errors.nombres?.type == "maxLength" && <Text style={{ color: 'red' }}> El nombre no puede exceder 30 caracteres</Text>}
        {errors.nombres?.type == "minLength" && <Text style={{ color: 'red' }}>El nombre minimo 3 caracteres</Text>}
        {errors.nombres?.type == "pattern" && <Text style={{ color: 'red' }}> El nombre solo con letras y espacios</Text>}
      </View>

      <View style={styles.body}>
        <Text>Asignaturas*: </Text>
        <Controller control={control}
          rules={{
            required: true, pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g, maxLength: 30, minLength: 3
          }}

          render={({ field: { onChange, onBlur, asignatura } }) => (
            <TextInput
              style={[styles.inpust, {
                borderColor: errors.asignatura?.type == "required" || errors.asignatura?.type == "pattern" || errors.asignatura?.type
                  == "maxLength" || errors.asignatura?.type == "minLength" ? 'red' : 'lightblue'
              }]}
              onChangeText={(asignatura) => setAsignaturas(asignatura)}
              onChange={onChange}
              onBlur={onBlur}
              value={asignatura}
            />
          )}
          name="asignatura"
        />
        {errors.asignatura?.type == "required" && <Text style={{ color: 'red' }}> la asignatura es obligatoria</Text>}
        {errors.asignatura?.type == "maxLength" && <Text style={{ color: 'red' }}> la asignatura no puede exceder 30 caracteres</Text>}
        {errors.asignatura?.type == "minLength" && <Text style={{ color: 'red' }}>la asignatura minimo 3 caracteres</Text>}
        {errors.asignatura?.type == "pattern" && <Text style={{ color: 'red' }}> la asignatura solo con letras y espacios</Text>}
      </View>

      <View style={styles.body}>
        <Text>Nota 1*: </Text>
        <Controller control={control}
          rules={{ required: true, pattern: /^[0-5]+$/g }}
          render={({ field: { onChange, onBlur, nota1 } }) => (

            <TextInput
              style={[styles.inpust, { borderColor: errors.nota1?.type == "required" || errors.nota1?.type == "pattern" ? 'red' : 'lightblue' }]}
              onChangeText={(nota1) => setNota1(nota1)}
              onChange={onChange}
              onBlur={onBlur}
              value={nota1}
              maxLength={1}
              minLength={1}
            />

          )}
          name="nota1"
        />
        {errors.nota1?.type == "required" && <Text style={{ color: 'red' }}> El Nota 1 es obligatoria</Text>}
        {errors.nota1?.type == "pattern" && <Text style={{ color: 'red' }}>Nota Maxima es 5 y solo numeros</Text>}
      </View>

      <View style={styles.body}>
        <Text>Nota 2*: </Text>
        <Controller control={control}
          rules={{ required: true, pattern: /^[0-5]+$/g }}
          render={({ field: { onChange, onBlur, nota2 } }) => (
            <TextInput
              style={[styles.inpust, { borderColor: errors.nota1?.type == "required" || errors.nota2?.type == "pattern" ? 'red' : 'lightblue' }]}
              onChangeText={(nota2) => setNota2(nota2)}
              onChange={onChange}
              onBlur={onBlur}
              value={nota2}
              maxLength={1}
              minLength={1}
            />
          )}
          name="nota2"
        />
        {errors.nota2?.type == "required" && <Text style={{ color: 'red' }}> El Nota 2 es obligatoria</Text>}
        {errors.nota2?.type == "pattern" && <Text style={{ color: 'red' }}>Nota Maxima es 5 y solo numeros</Text>}
      </View>

      <View style={styles.body}>
        <Text>Nota 3*: </Text>
        <Controller control={control}
          rules={{ required: true, pattern: /^[0-5]+$/g }}
          render={({ field: { onChange, onBlur, nota3 } }) => (

            <TextInput
              style={[styles.inpust, { borderColor: errors.nota1?.type == "required" || errors.nota3?.type == "pattern" ? 'red' : 'lightblue' }]}
              onChangeText={(nota3) => setNota3(nota3)}
              onChange={onChange}
              onBlur={onBlur}
              value={nota3}
              maxLength={1}
              minLength={1}
            />
          )}
          name="nota3"
        />
        {errors.nota3?.type == "required" && <Text style={{ color: 'red' }}> El Nota 3 es obligatoria</Text>}
        {errors.nota3?.type == "pattern" && <Text style={{ color: 'red' }}> Nota Maxima es 5 y solo numeros.</Text>}

      </View>

      <View style={styles.body}>
        <Text>Definitiva: </Text>
        <TextInput
          //placeholder='Ingrese la nota 3'
          style={[styles.inpust, { borderColor: 'lightblue' }]}
          onChangeText={(definitiva) => setDefinitiva(definitiva)}
          value={definitiva}
          editable={false}
        />
      </View>

      <View style={styles.body}>
        <Text>Observacion: </Text>
        <TextInput
          //placeholder='Ingrese la nota 3'
          style={[styles.inpust, { borderColor: 'lightblue' }]}
          onChangeText={(observacion) => setObservacion(observacion)}
          value={observacion}
        />
      </View>

      {/* ESTOS SON LOS BOTONES */}

      <View style={styles.botones}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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
    borderBottom: "solid 1px",
    alignItems:'center',
    flexDirection: 'column'
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
  inpust: {
    padding: 1,
    borderRadius: 5,
    color: 'black',
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'lightblue'
  }
});
