import React, { useState } from "react";
import styled from "styled-components";

export function CalcButton(props) {
  return <button onClick={props.onClick}>{props.value}</button>;
}
