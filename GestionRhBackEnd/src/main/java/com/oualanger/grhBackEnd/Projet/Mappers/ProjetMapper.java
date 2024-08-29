package com.oualanger.grhBackEnd.Projet.Mappers;


import com.oualanger.grhBackEnd.Projet.Dto.ProjetDto;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjetMapper {

    ProjetMapper INSTANCE = Mappers.getMapper(ProjetMapper.class);

   Projet toModel(ProjetDto projetDto);

    ProjetDto toDTO(Projet projet);

    List<ProjetDto> toDTOs(List<Projet> projets);

    List<Projet> toModels(List<ProjetDto> projetDtoList);
}
