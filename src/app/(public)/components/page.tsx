"use client";

import React, { useState, useId } from "react";
import {
  Input,
  InputNumber,
  TextArea,
  DatePicker,
  Label,
  InputField,
  InputNumberField,
  TextAreaField,
  DatePickerField,
  FormSection,
  FormTemplate,
  Button,
  ButtonGroup,
  IconButton,
  ButtonField,
} from "@/components/ui/atomic-design";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  Download,
  Upload,
  Search,
  Heart,
  Star,
  Settings,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Check,
} from "lucide-react";

export default function ComponentsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    description: "",
    birthDate: null as Date | null,
    budget: "",
    notes: "",
  });

  const [loadingStates, setLoadingStates] = useState({
    primary: false,
    secondary: false,
    destructive: false,
    outline: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadingButton = (buttonType: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [buttonType]: true }));
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonType]: false }));
    }, 2000);
  };

  // Definir los colores directamente para evitar problemas de hidratación
  const primaryColors = {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  };

  const secondaryColors = {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  };

  const accentColors = {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  };

  const semanticColors = {
    success: "#22c55e",
    warning: "#f97316",
    error: "#ef4444",
    info: "#3b82f6",
  };

  return (
    <div className="min-h-screen bg-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-text-primary">
            Sistema de Diseño
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Documentación completa del sistema de diseño de la plataforma de
            gestión de proyectos
          </p>
        </div>

        {/* Paleta de Colores */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-text-primary border-b border-border-primary pb-2">
            🎨 Paleta de Colores
          </h2>

          {/* Colores Primarios */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              Colores Primarios (Azul)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(primaryColors).map(([shade, color]) => (
                <div key={shade} className="space-y-2">
                  <div
                    className="h-20 rounded-lg border border-border-primary"
                    style={{ backgroundColor: color }}
                    title={`primary-${shade}`}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">
                      {shade}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      primary-{shade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colores Secundarios */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              Colores Secundarios (Verde)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(secondaryColors).map(([shade, color]) => (
                <div key={shade} className="space-y-2">
                  <div
                    className="h-20 rounded-lg border border-border-primary"
                    style={{ backgroundColor: color }}
                    title={`secondary-${shade}`}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">
                      {shade}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      secondary-{shade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colores de Acento */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              Colores de Acento (Naranja)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(accentColors).map(([shade, color]) => (
                <div key={shade} className="space-y-2">
                  <div
                    className="h-20 rounded-lg border border-border-primary"
                    style={{ backgroundColor: color }}
                    title={`accent-${shade}`}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">
                      {shade}
                    </p>
                    <p className="text-xs text-text-tertiary">accent-{shade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colores Semánticos */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              Colores Semánticos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(semanticColors).map(([name, color]) => (
                <div key={name} className="space-y-2">
                  <div
                    className="h-20 rounded-lg border border-border-primary"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary capitalize">
                      {name}
                    </p>
                    <p className="text-xs text-text-tertiary">bg-{name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Átomos */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-text-primary border-b border-border-primary pb-2">
            ⚛️ Átomos
          </h2>

          {/* Botones */}
          <div className="space-y-8">
            <h3 className="text-xl font-medium text-text-primary">Botones</h3>

            {/* Variantes de Botones */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-text-primary">
                Variantes
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Tamaños de Botones */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-text-primary">Tamaños</h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Botones con Estados */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-text-primary">Estados</h4>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button loading loadingText="Guardando...">
                  Guardar
                </Button>
              </div>
            </div>

            {/* Botones con Iconos */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-text-primary">
                Con Iconos
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button leftIcon={<Plus className="h-4 w-4" />}>Agregar</Button>
                <Button rightIcon={<Download className="h-4 w-4" />}>
                  Descargar
                </Button>
                <Button
                  leftIcon={<Save className="h-4 w-4" />}
                  rightIcon={<Check className="h-4 w-4" />}
                >
                  Guardar
                </Button>
              </div>
            </div>

            {/* Botones de Ancho Completo */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-text-primary">
                Ancho Completo
              </h4>
              <div className="space-y-2">
                <Button fullWidth>Botón de Ancho Completo</Button>
                <Button fullWidth variant="outline">
                  Outline Full Width
                </Button>
              </div>
            </div>

            {/* Botones Redondeados */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-text-primary">
                Redondeados
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button rounded>Redondeado</Button>
                <Button rounded variant="outline">
                  Outline Redondeado
                </Button>
                <Button rounded size="lg">
                  Large Redondeado
                </Button>
              </div>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              Icon Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <IconButton
                icon={<Edit className="h-4 w-4" />}
                tooltip="Editar"
              />
              <IconButton
                icon={<Trash2 className="h-4 w-4" />}
                variant="destructive"
                tooltip="Eliminar"
              />
              <IconButton
                icon={<Settings className="h-4 w-4" />}
                variant="outline"
                tooltip="Configuración"
              />
              <IconButton
                icon={<Heart className="h-4 w-4" />}
                variant="ghost"
                tooltip="Favorito"
              />
              <IconButton
                icon={<Star className="h-4 w-4" />}
                variant="secondary"
                tooltip="Destacar"
              />
              <IconButton
                icon={<Search className="h-4 w-4" />}
                size="lg"
                tooltip="Buscar"
              />
              <IconButton
                icon={<Plus className="h-5 w-5" />}
                size="xl"
                rounded
                tooltip="Agregar"
              />
            </div>
          </div>

          {/* Button Groups */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              Button Groups
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-text-primary mb-2">
                  Horizontal
                </h4>
                <ButtonGroup>
                  <Button variant="outline">Izquierda</Button>
                  <Button variant="outline">Centro</Button>
                  <Button variant="outline">Derecha</Button>
                </ButtonGroup>
              </div>

              <div>
                <h4 className="text-lg font-medium text-text-primary mb-2">
                  Vertical
                </h4>
                <ButtonGroup orientation="vertical">
                  <Button variant="outline">Arriba</Button>
                  <Button variant="outline">Centro</Button>
                  <Button variant="outline">Abajo</Button>
                </ButtonGroup>
              </div>

              <div>
                <h4 className="text-lg font-medium text-text-primary mb-2">
                  Con Outline
                </h4>
                <ButtonGroup variant="outlined">
                  <Button variant="outline">Guardar</Button>
                  <Button variant="outline">Cancelar</Button>
                  <Button variant="outline">Eliminar</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">Input</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Input Default</Label>
                <Input placeholder="Input por defecto" />
              </div>
              <div className="space-y-2">
                <Label>Input Filled</Label>
                <Input variant="filled" placeholder="Input filled" />
              </div>
              <div className="space-y-2">
                <Label>Input Outlined</Label>
                <Input variant="outlined" placeholder="Input outlined" />
              </div>
              <div className="space-y-2">
                <Label>Input Small</Label>
                <Input size="sm" placeholder="Input pequeño" />
              </div>
              <div className="space-y-2">
                <Label>Input Large</Label>
                <Input size="lg" placeholder="Input grande" />
              </div>
              <div className="space-y-2">
                <Label>Input con Error</Label>
                <Input error placeholder="Input con error" />
              </div>
            </div>
          </div>

          {/* InputNumber */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              InputNumber
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Número con Controles</Label>
                <InputNumber placeholder="0" min={0} max={100} />
              </div>
              <div className="space-y-2">
                <Label>Número sin Controles</Label>
                <InputNumber showControls={false} placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Número con Decimales</Label>
                <InputNumber decimalPlaces={2} placeholder="0.00" />
              </div>
            </div>
          </div>

          {/* TextArea */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">TextArea</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>TextArea Default</Label>
                <TextArea placeholder="Escribe tu descripción aquí..." />
              </div>
              <div className="space-y-2">
                <Label>TextArea con Contador</Label>
                <TextArea
                  placeholder="Máximo 100 caracteres..."
                  maxLength={100}
                  showCharacterCount
                />
              </div>
            </div>
          </div>

          {/* DatePicker */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              DatePicker
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Selector de Fecha</Label>
                <DatePicker
                  value={formData.birthDate}
                  onChange={(date) => handleInputChange("birthDate", date)}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha con Rango</Label>
                <DatePicker
                  minDate={new Date("2020-01-01")}
                  maxDate={new Date("2030-12-31")}
                  placeholder="Selecciona una fecha válida"
                />
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">Label</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Label Default</Label>
                <Input placeholder="Campo normal" />
              </div>
              <div className="space-y-2">
                <Label variant="required">Campo Requerido</Label>
                <Input placeholder="Campo obligatorio" />
              </div>
              <div className="space-y-2">
                <Label variant="optional">Campo Opcional</Label>
                <Input placeholder="Campo opcional" />
              </div>
            </div>
          </div>
        </section>

        {/* Moléculas */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-text-primary border-b border-border-primary pb-2">
            🧬 Moléculas
          </h2>

          {/* Button Fields */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">
              ButtonField
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ButtonField
                label="Botón Principal"
                variant="default"
                helperText="Este es un botón de acción principal"
              >
                Guardar Cambios
              </ButtonField>

              <ButtonField
                label="Botón de Carga"
                variant="secondary"
                loading={loadingStates.secondary}
                loadingText="Procesando..."
                helperText="Botón con estado de carga"
                onClick={() => handleLoadingButton("secondary")}
              >
                Procesar Datos
              </ButtonField>

              <ButtonField
                label="Botón Destructivo"
                variant="destructive"
                helperText="Acción que no se puede deshacer"
              >
                Eliminar
              </ButtonField>

              <ButtonField
                label="Botón con Label a la Izquierda"
                labelPosition="left"
                variant="outline"
                helperText="Label posicionado a la izquierda"
              >
                Configurar
              </ButtonField>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-text-primary">
                InputField
              </h3>
              <InputField
                label="Nombre Completo"
                labelVariant="required"
                placeholder="Ingresa tu nombre completo"
                helperText="Este campo es obligatorio"
              />
              <InputField
                label="Email"
                labelVariant="required"
                type="email"
                placeholder="tu@email.com"
                errorMessage="El email no es válido"
              />
              <InputField
                label="Sitio Web"
                labelVariant="optional"
                placeholder="https://tu-sitio.com"
                helperText="Opcional - incluye https://"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-text-primary">
                InputNumberField
              </h3>
              <InputNumberField
                label="Edad"
                labelVariant="required"
                placeholder="25"
                min={0}
                max={120}
                helperText="Debe ser un número entre 0 y 120"
              />
              <InputNumberField
                label="Presupuesto"
                labelVariant="required"
                placeholder="1000.00"
                decimalPlaces={2}
                helperText="Incluye hasta 2 decimales"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-text-primary">
                TextAreaField
              </h3>
              <TextAreaField
                label="Descripción del Proyecto"
                labelVariant="required"
                placeholder="Describe tu proyecto..."
                helperText="Sé específico sobre los objetivos"
                maxLength={500}
                showCharacterCount
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-text-primary">
                DatePickerField
              </h3>
              <DatePickerField
                label="Fecha de Inicio"
                labelVariant="required"
                placeholder="Selecciona la fecha de inicio"
                helperText="La fecha debe ser futura"
                minDate={new Date()}
              />
            </div>
          </div>
        </section>

        {/* Organismos */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-text-primary border-b border-border-primary pb-2">
            🦠 Organismos
          </h2>

          <FormSection
            title="Información Personal"
            description="Completa tus datos personales básicos"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Nombre"
                labelVariant="required"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Tu nombre"
              />
              <InputField
                label="Email"
                labelVariant="required"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="tu@email.com"
              />
              <InputNumberField
                label="Edad"
                labelVariant="required"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="25"
                min={0}
                max={120}
              />
              <DatePickerField
                label="Fecha de Nacimiento"
                labelVariant="optional"
                value={formData.birthDate}
                onChange={(date) => handleInputChange("birthDate", date)}
                placeholder="Selecciona tu fecha de nacimiento"
              />
            </div>
          </FormSection>

          <FormSection
            title="Información del Proyecto"
            description="Detalles sobre el proyecto que quieres gestionar"
          >
            <div className="space-y-6">
              <InputField
                label="Nombre del Proyecto"
                labelVariant="required"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Mi Proyecto Web"
              />
              <TextAreaField
                label="Descripción"
                labelVariant="required"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Describe tu proyecto..."
                maxLength={1000}
                showCharacterCount
              />
              <InputNumberField
                label="Presupuesto Estimado"
                labelVariant="optional"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="5000.00"
                decimalPlaces={2}
                helperText="Presupuesto en dólares"
              />
            </div>
          </FormSection>
        </section>

        {/* Templates */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-text-primary border-b border-border-primary pb-2">
            📄 Templates
          </h2>

          <FormTemplate
            title="Formulario de Registro"
            subtitle="Completa todos los campos para crear tu cuenta"
            footer={
              <div className="flex gap-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar Proyecto</Button>
              </div>
            }
          >
            <FormSection
              title="Información Personal"
              description="Datos básicos de contacto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Nombre"
                  labelVariant="required"
                  placeholder="Tu nombre"
                />
                <InputField
                  label="Email"
                  labelVariant="required"
                  type="email"
                  placeholder="tu@email.com"
                />
              </div>
            </FormSection>

            <FormSection
              title="Detalles del Proyecto"
              description="Información específica del proyecto"
            >
              <div className="space-y-6">
                <InputField
                  label="Nombre del Proyecto"
                  labelVariant="required"
                  placeholder="Mi Proyecto Web"
                />
                <TextAreaField
                  label="Descripción"
                  labelVariant="required"
                  placeholder="Describe tu proyecto..."
                  maxLength={500}
                  showCharacterCount
                />
              </div>
            </FormSection>
          </FormTemplate>
        </section>

        {/* Estados y Variaciones */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-text-primary border-b border-border-primary pb-2">
            🎭 Estados y Variaciones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">
                Estados de Input
              </h3>
              <InputField label="Campo Normal" placeholder="Estado normal" />
              <InputField
                label="Campo con Error"
                placeholder="Campo con error"
                errorMessage="Este campo es requerido"
              />
              <InputField
                label="Campo Exitoso"
                placeholder="Campo exitoso"
                successMessage="¡Perfecto! Campo válido"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Tamaños</h3>
              <InputField
                label="Input Pequeño"
                size="sm"
                placeholder="Tamaño pequeño"
              />
              <InputField
                label="Input Mediano"
                size="md"
                placeholder="Tamaño mediano"
              />
              <InputField
                label="Input Grande"
                size="lg"
                placeholder="Tamaño grande"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">
                Variantes
              </h3>
              <InputField
                label="Default"
                variant="default"
                placeholder="Variante por defecto"
              />
              <InputField
                label="Filled"
                variant="filled"
                placeholder="Variante filled"
              />
              <InputField
                label="Outlined"
                variant="outlined"
                placeholder="Variante outlined"
              />
            </div>
          </div>
        </section>

        {/* Información del Sistema */}
        <section className="bg-background-secondary rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary">
            📋 Información del Sistema de Diseño
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">
                Características
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Sistema de colores consistente y accesible</li>
                <li>• Componentes reutilizables y modulares</li>
                <li>• Variantes y tamaños estandarizados</li>
                <li>• Estados de error y éxito integrados</li>
                <li>• Soporte para formularios complejos</li>
                <li>• Diseño responsive y accesible</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">
                Tecnologías
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• React 18 con TypeScript</li>
                <li>• Tailwind CSS para estilos</li>
                <li>• shadcn/ui como base</li>
                <li>• Lucide React para iconos</li>
                <li>• Atomic Design Methodology</li>
                <li>• Next.js 14 App Router</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
