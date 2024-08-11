<template>
  <v-footer color="secondary-lighten-1" class="d-flex flex-column">
    <v-row justify="center" no-gutters>
      <v-col class="text-center text-body-2" cols="12">
        <v-btn
          color="primary"
          href="tel:+41 76 414 90 56"
          prepend-icon="mdi-phone"
          slim
          variant="text"
        >
          Sara Corradini
        </v-btn>
      </v-col>
      <v-col class="text-center text-caption" cols="12">
        {{ new Date().getFullYear() }} ©
        <strong>Abacus Research AG</strong>
        | C2
      </v-col>
    </v-row>
  </v-footer>
</template>
