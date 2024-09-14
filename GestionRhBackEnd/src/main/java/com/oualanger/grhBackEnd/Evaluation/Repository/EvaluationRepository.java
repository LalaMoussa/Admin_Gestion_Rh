package com.oualanger.grhBackEnd.Evaluation.Repository;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
}
